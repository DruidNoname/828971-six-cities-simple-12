import { name, system, address, lorem, internet, date} from 'faker'
import {Offer} from '../types/offer';
import {User} from '../types/user';
import {Feedback} from '../types/feedback';

export const makeFakeOffer = (): Offer => ({
  city: {
    name: address.city(),
    location: {
      latitude: +address.latitude(),
      longitude: +address.longitude(),
      zoom: 13,
    }
  },
  previewImage: system.filePath(),
  images: new Array(3).fill(null).map((): string => { return system.filePath()}),
  title: name.title(),
  isPremium: true,
  rating: 4,
  type: 'house',
  bedrooms: 2,
  maxAdults: 2,
  price: 230,
  goods: new Array(3).fill(null).map((): string => { return name.title()}),
  host: {
    id: 235,
    name: name.firstName(),
    isPro: true,
    avatarUrl: internet.avatar(),
  },

  description: name.title(),
  location: {
    latitude: +address.latitude(),
    longitude: +address.longitude(),
    zoom: 13,
  },
  id: 234,
} as Offer);

export const makeFakeFeedback = (): Feedback => ({
  comment: lorem.lines(),
  rating: 5,
  id: 234,
  user: {
    id: 235,
    name: name.firstName(),
    isPro: true,
    avatarUrl: internet.avatar(),
  },
  date: date.past().toString(),
} as Feedback);
