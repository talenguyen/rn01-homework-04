import React, {useState} from 'react';
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

function computeCardSize(width, columns, height) {
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
    Array.from({length: columns * rows}, (_, index) => ({
      id: index,
      image: images[index % images.length],
      isUp: false,
      isHidden: false,
    })),
  );

  return cards;
}

const onCardPress =
  ({
    card,
    cards,
    setCards,
    lastSelectedCard,
    setLastSelectedCard,
    isAnimating,
    setIsAnimating,
  }) =>
  () => {
    if (isAnimating) {
      return;
    }

    if (lastSelectedCard && card.id === lastSelectedCard.id) {
      return; // Select the same card.
    }

    setIsAnimating(true);

    // show card
    setCards(
      cards.map(element => {
        if (element.id === card.id) {
          return {
            ...element,
            isUp: true,
          };
        }
        return element;
      }),
    );

    setTimeout(() => {
      setIsAnimating(false);
      if (!lastSelectedCard) {
        setLastSelectedCard(card);
        return;
      }

      if (card.image.id === lastSelectedCard.image.id) {
        // Select the same image
        const newCards = cards.map(element => {
          if (element.id === card.id || element.id === lastSelectedCard.id) {
            return {
              ...element,
              isHidden: true,
            };
          }
          return element;
        });

        setCards(newCards);
      } else {
        // Select the wrong image
        const newCards = cards.map(element => {
          if (element.id === card.id || element.id === lastSelectedCard.id) {
            return {
              ...element,
              isUp: false,
            };
          }
          return element;
        });

        setCards(newCards);
      }

      setLastSelectedCard(null);
    }, animationTimeout);
  };

const Desk = ({width, height, columns}) => {
  const [cards, setCards] = useState(composeCards(columns));
  const [lastSelectedCard, setLastSelectedCard] = useState(null);
  const [{cardWidth, cardHeight}] = useState(
    computeCardSize(width, columns, height),
  );
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <View style={[styles.container]}>
      {cards.map(card => (
        <View key={card.id} style={{marginTop: verticalSpacing}}>
          <Card
            width={cardWidth}
            height={cardHeight}
            source={card.image.source}
            isUp={card.isUp}
            isHidden={card.isHidden}
            onPress={onCardPress({
              card,
              cards,
              setCards,
              lastSelectedCard,
              setLastSelectedCard,
              isAnimating,
              setIsAnimating,
            })}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default Desk;
