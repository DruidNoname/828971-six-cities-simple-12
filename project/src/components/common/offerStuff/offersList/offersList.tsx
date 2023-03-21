import React, {useEffect, useState} from 'react';
import CurrentOffer from '../offerCard/offer';
import {Offer} from '../../../../types/offer';
// import {Property} from 'csstype';

type OffersListProps = {
  offers: Offer[];
}

function OffersList({offers}: OffersListProps): JSX.Element {
  const [, setCardHovered] = useState<Offer|null>(null);
  const [iterable, setIterable] = useState<Offer[]>(offers);

  useEffect(() => {
    const page: string = document.location.pathname;
    if (page.includes('offer')) {
      const closestQuantity = 3;
      const slicedArray: Offer[] = offers.slice(0, closestQuantity);
      setIterable(slicedArray);
    } else {
      setIterable(offers);
    }
  }, []);

  const mouseEnterHandler = (elem: Offer) => setCardHovered(elem);
  const mouseLeaveHandler = () => setCardHovered(null);


  return(
    <>
      { iterable.map((offer: Offer): JSX.Element => (
        <CurrentOffer
          key={ offer.id }
          myProperty= { offer }
          onMouseEnter={ () => mouseEnterHandler(offer) }
          onMouseLeave={ mouseLeaveHandler }
        />
      ))}
    </>
  );
}

export default OffersList;
