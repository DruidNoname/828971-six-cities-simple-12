import GlobalWrapper from '../../components/globalWrapper/globalWrapper';
import {Offer} from '../../types/offer';
import React from 'react';
import FeedbackForm from '../../components/roomPage/feedbackForm/feedbackForm';
import FeedbacksList from '../../components/roomPage/feedbackList/feedbackList';
import {Feedback} from '../../types/feedback';
import RoomGallery from '../../components/roomPage/roomGallery/roomGallery';
import RoomInfo from '../../components/roomPage/roomInfo/roomInfo';
import HostBlock from '../../components/roomPage/hostBlock/hostBlock';
import OffersList from '../../components/common/offersList/offersList';

type buildingProps = {
  offers: Offer[];
  property: Offer;
  feedbacks: Feedback[];
}

function Residence({ offers, property, feedbacks } : buildingProps): JSX.Element {

  return (
    <GlobalWrapper>
      <main className="page__main page__main--property">
        <section className="property">
          <RoomGallery pics={ property.images } />
          <div className="property__container container">
            <div className="property__wrapper">
              <RoomInfo property={ property }/>
              <HostBlock host={ property.host } description={ property.description}/>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                <FeedbacksList feedbacks={ feedbacks }/>
                <FeedbackForm />
              </section>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OffersList offers={offers} />
            </div>
          </section>
        </div>
      </main>
    </GlobalWrapper>
  );
}
export default Residence;
