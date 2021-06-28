import React from 'react';
import {StyleSheet, View} from 'react-native';
import Card from './Card';
import Images from '../assets/images';
import {shuffleArray} from '../utilities/arrayUtils';

const verticalSpacing = 16;
const minimumHorizontalSpacing = 8;
const rows = 3;
const cardSizeRatio = 0.7;
const singleAnimationTimeout = 300; // milliseconds
const doubleAnimationTimeout = 2 * singleAnimationTimeout + 100; // milliseconds
const sourceImages = [
  {id: 1, source: Images.card1},
  {id: 2, source: Images.card2},
  {id: 3, source: Images.card3},
  {id: 4, source: Images.card4},
  {id: 5, source: Images.card5},
  {id: 6, source: Images.card6},
  {id: 7, source: Images.card7},
  {id: 8, source: Images.card8},
  {id: 9, source: Images.card9},
  {id: 10, source: Images.card10},
];

function computeCardSize({width, height, columns}) {
  const maxCardWidth =
    (width - (columns + 1) * minimumHorizontalSpacing) / columns;
  const cardHeight = (height - (rows + 1) * verticalSpacing) / rows;
  const cardWidth = Math.min(cardSizeRatio * height, maxCardWidth);
  return {cardWidth, cardHeight};
}

function composeCards(columns) {
  const validHalfCardCount = Number.parseInt((columns * rows) / 2, 10);
  const images = Array.from(
    {length: validHalfCardCount},
    (_, index) => sourceImages[index % sourceImages.length],
  );

  const cards = shuffleArray(
    Array.from({length: validHalfCardCount * 2}, (_, index) => ({
      id: index,
      image: images[index % images.length],
      isUp: false,
      isHidden: false,
    })),
  );

  return cards;
}

class Desk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: composeCards(props.columns),
      lastSelectedCard: null,
      isAnimating: false,
    };
  }

  onCardPress(card) {
    return () => {
      if (this.state.isAnimating) {
        return;
      }

      if (
        this.state.lastSelectedCard &&
        card.id === this.state.lastSelectedCard.id
      ) {
        return; // Select the same card.
      }

      this.setState({
        isAnimating: true,
        cards: this.state.cards.map(element => {
          if (element.id === card.id) {
            return {
              ...element,
              isUp: true,
            };
          }
          return element;
        }),
      });

      let nextState, isCompleted, timeOutValue;
      if (!this.state.lastSelectedCard) {
        // set
        nextState = {
          isAnimating: false,
          lastSelectedCard: card,
        };
        isCompleted = false;
        timeOutValue = singleAnimationTimeout;
      } else if (card.image.id === this.state.lastSelectedCard.image.id) {
        // Selected the right image
        const cards = this.state.cards.map(element => {
          if (
            element.id === card.id ||
            element.id === this.state.lastSelectedCard.id
          ) {
            return {
              ...element,
              isHidden: true,
            };
          }
          return element;
        });
        nextState = {
          cards,
          isAnimating: false,
          lastSelectedCard: null,
        };
        isCompleted = cards.every(element => element.isHidden);
        timeOutValue = singleAnimationTimeout;
      } else {
        const cards = this.state.cards.map(element => {
          if (
            element.id === card.id ||
            element.id === this.state.lastSelectedCard.id
          ) {
            return {
              ...element,
              isUp: false,
            };
          }
          return element;
        });
        nextState = {
          cards,
          isAnimating: false,
          lastSelectedCard: null,
        };
        isCompleted = false;
        timeOutValue = doubleAnimationTimeout;
      }

      this.timeOutId && clearTimeout(this.timeOutId); // clear previous timeout

      this.timeOutId = setTimeout(() => {
        this.setState(nextState);
        isCompleted && this.props.onCompleted && this.props.onCompleted(); //trigger callback
      }, timeOutValue);
    };
  }

  componentWillUnmount() {
    this.timeOutId && clearTimeout(this.timeOutId);
  }

  render() {
    const {width, height, columns} = this.props;
    const {cardWidth, cardHeight} = computeCardSize({width, height, columns});
    const {cards} = this.state;

    return (
      <View style={[styles.container]}>
        {cards.map(card => (
          <View key={card.id.toString()} style={{marginTop: verticalSpacing}}>
            <Card
              width={cardWidth}
              height={cardHeight}
              source={card.image.source}
              isUp={card.isUp}
              isHidden={card.isHidden}
              onPress={this.onCardPress(card)}
            />
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});

export default Desk;
