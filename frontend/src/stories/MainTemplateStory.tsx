import React from 'react';
import { storiesOf } from '@storybook/react';
import MainTemplate from '../components/general/MainTemplate';
import { ProductPageAsync } from '../models/product/store';

const productPageAsync: ProductPageAsync = {
  payload: {
    pageCriteria: { page: 1, size: 10 }
  },
  result: {
    list: [{
      id: 1,
      name: 'Clean Code',
      author: '로버트 C. 마틴',
      publisher: '인사이트',
      publishedDate: '2013-12-24',
      regularPrice: 33000,
      imageFileName: 'test.jpg',
      stockQuantity: 9,
      salesQuantity: 1,
      rating: 4,
      reviewCount: 1,
      discountPercent: 10,
      depositPercent: 5
    }],
    totalCount: 1
  },
  error: undefined
}

storiesOf('Text', module)
  .addWithJSX('기본 설정', () => <MainTemplate productPageAsync={productPageAsync} />);