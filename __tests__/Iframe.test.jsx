import "@testing-library/jest-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import Iframe from '@/app/components/Iframe';

describe('Iframe', () => {
    const iframeTitle = "main-iframe";

    it('should render correctly with a URL', () => {
        const url = 'https://example.com';
        render(<Iframe url={url} />);
        const iframe = screen.getByTitle(iframeTitle);
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('src', url);
    });

    it('should render correctly with a blank URL', () => {
        render(<Iframe url="" />);
        const iframe = screen.queryByTitle(iframeTitle);
        expect(iframe).toBeNull();
    });

    it('should reload the iframe when the button is clicked', () => {
        const url = 'https://example.com';
        render(<Iframe url={url} />);
        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByTitle(iframeTitle)).toHaveAttribute('src', url);
    });
});