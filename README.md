# React Headless Carousel

Demo: https://petrhuli.cz/headless/

In the App.tsx file you can find example usage.

## Available Component Parts

# Carousel

The main component.
Props:
dataLengthProp: number - The length of list to display in carousel
children: React.ReactNode

# Carousel.CarouselView

Inner wrapper for main caousel section.
Props:
children?: JSX.Element | JSX.Element[];
style?: React.CSSProperties;
className?: string;

# Carousel.CarouselItem
The single carousel item.
Props:
  index: number;
  image?: string;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  animation?: 'zoomIn' | 'slide';
  translateRatio?: number;

# Carousel.SideButton
Side control button.
Props: 
  side: 'left' | 'right';
  onClick?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;

# Carousel.CarouselControls
The control section to select specific item. 
Props: 
  onSlideChange?: (index: number) => void;
  wrapperStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  itemClass?: string;
  activeClass?: string;
  wrapperClass?: string;

## Available Scripts

In the project directory, you can run:

### `npm start`

### `npm test`

### `npm run build`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
