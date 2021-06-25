import React from 'react';
import {StyleSheet, View} from 'react-native';
import Card from './Card';
import Images from '../assets/images';
import {shuffleArray} from '../utilities/arrayUtils';

const verticalSpacing = 16;
const minimumHorizontalSpacing = 8;
const rows = 3;
const cardSizeRatio = 0.7;
const animationTimeout = 300; // milliseconds
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
  console.log({width, height, columns});
  const maxCardWidth =
    (width - (columns + 1) * minimumHorizontalSpacing) / columns;
  const cardHeight = (height - (rows + 1) * verticalSpacing) / rows;
  const cardWidth = Math.min(cardSizeRatio * height, maxCardWidth);
  console.log({cardWidth, cardHeight});
  return {cardWidth, cardHeight};
}

function composeCards(columns) {
  const validHalfCardCount = Number.parseInt((columns * rows) / 2, 10);
  const images = Array.from(
    {length: validHalfCardCount},
    (_, index) => sourceImages[index % sourceImages.length],
  );

  const cards = shuffleArray(
    Array.from({length: columns * rows}, (_, index) => ({
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
      console.log({state: this.state});
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

      this.timeOutId = setTimeout(() => {
        if (!this.state.lastSelectedCard) {
          this.setState({
            isAnimating: false,
            lastSelectedCard: card,
          });
          return;
        }

        let nextState;
        if (card.image.id === this.state.lastSelectedCard.image.id) {
          // Select the same image
          nextState = this.state.cards.map(element => {
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
        } else {
          // Select the wrong image
          nextState = this.state.cards.map(element => {
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
        }
        this.setState({
          cards: nextState,
          isAnimating: false,
          lastSelectedCard: null,
        });
        const isCompleted = nextState.every(element => element.isHidden);
        isCompleted && this.props.onCompleted && this.props.onCompleted(); //trigger callback
      }, animationTimeout);
    };
  }

  componentWillUnmount() {
    this.timeOutId && clearTimeout(this.timeOutId);
  }

  render() {
    const {width, height, columns} = this.props;
    const {cardWidth, cardHeight} = computeCardSize({width, height, columns});
    const {cards} = this.state;

    console.log({cardWidth, cardHeight, cards});

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
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default Desk;
