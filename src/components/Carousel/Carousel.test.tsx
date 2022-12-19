import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Carousel from './Carousel';

const data = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1611781928379-8b1b0b1b1b1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    title: 'title 1'
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1611781928379-8b1b0b1b1b1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    title: 'title 2'
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1611781928379-8b1b0b1b1b1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    title: 'title 3'
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1611781928379-8b1b0b1b1b1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    title: 'title 4'
  }
];

test('render image ass css backgound and display title as child', () => {
  render(
    <Carousel data={data}>
      <Carousel.CarouselView>
        {data.map(({ image, title }, index) => (
          <Carousel.CarouselItem key={index} index={index} className="carousel_item" {...{ image }}>
            {title}
          </Carousel.CarouselItem>
        ))}
      </Carousel.CarouselView>
    </Carousel>
  );

  const image = screen.getByTestId('carousel-item-0');
  expect(image).toHaveStyle(`background-image: url(${data[0].image})`);

  const title = screen.getByText('title 1');
  expect(title).toBeInTheDocument();
});

test('after clicking on left button activeIndex value in context should increase by 1', () => {
  render(
    <Carousel data={data}>
      <Carousel.ArrowButton side="left" />
      <Carousel.CarouselView>
        {data.map(({ image, title }, index) => (
          <Carousel.CarouselItem key={index} index={index} className="carousel_item" {...{ image }}>
            {title}
          </Carousel.CarouselItem>
        ))}
      </Carousel.CarouselView>
    </Carousel>
  );

  const leftButton = screen.getByTestId('button-left');
  act(() => {
    leftButton.click();
  });
  const image = screen.getByTestId('carousel-item-1');
  expect(image).toHaveStyle(`z-index: 4`);
});

test('after clicking on right button activeIndex value in context should decrease by 1', () => {
  render(
    <Carousel data={data}>
      <Carousel.ArrowButton side="right" />
      <Carousel.CarouselView>
        {data.map(({ image, title }, index) => (
          <Carousel.CarouselItem key={index} index={index} className="carousel_item" {...{ image }}>
            {title}
          </Carousel.CarouselItem>
        ))}
      </Carousel.CarouselView>
    </Carousel>
  );

  const rightButton = screen.getByTestId('button-right');
  act(() => {
    rightButton.click();
  });
  const image = screen.getByTestId('carousel-item-3');
  expect(image).toHaveStyle(`z-index: 4`);
});

test('select item after clicking on carousel control number', () => {
  render(
    <Carousel data={data}>
      <Carousel.CarouselView>
        {data.map(({ image, title }, index) => (
          <Carousel.CarouselItem key={index} index={index} className="carousel_item" {...{ image }}>
            {title}
          </Carousel.CarouselItem>
        ))}
      </Carousel.CarouselView>
      <Carousel.CarouselControls />
    </Carousel>
  );

  const control = screen.getByTestId('carousel-control-2');
  act(() => {
    control.click();
  });
  const image = screen.getByTestId('carousel-item-2');
  expect(image).toHaveStyle(`z-index: 4`);
});
