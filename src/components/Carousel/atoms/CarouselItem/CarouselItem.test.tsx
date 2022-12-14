import { render, screen } from '@testing-library/react';
import CarouselItem from './CarouselItem';

describe('CarouselItem', () => {
    it('should render', () => {
        render(<CarouselItem index={1} />);
        expect(screen.getByTestId('CarouselItem')).toBeInTheDocument();
    });
    }
);
