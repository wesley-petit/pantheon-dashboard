import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import WebServiceEditor from '@/app/components/WebServiceEditor';

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn()
    }),
}));

describe('WebServiceEditor', () => {
    const webServices = [
        { id: 1, name: "Docsify", url: "https://www.blog.example.com", thumbnailPath: "/webservices/Docsify.png", sortOrder: 1 },
        { id: 2, name: "Grafana", url: "https://www.monitoring.example.com", thumbnailPath: "/webservices/Grafana.png", sortOrder: 2 }
    ];

    it('should renders correctly when no web service are provided', () => {
        const { container } = render(<WebServiceEditor webServices={[]} />);
        expect(container).toMatchSnapshot();
        expect(screen.queryByText("Docsify")).toBeNull();
    });

    it('should render the web service editor', () => {
        render(<WebServiceEditor webServices={webServices} />);
        expect(screen.getAllByText("Docsify")).toHaveLength(2);
        expect(screen.getAllByText("Grafana")).toHaveLength(2);
    });

});