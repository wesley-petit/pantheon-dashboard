import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import WebServiceViewer from '@/app/components/WebServiceViewer';

jest.mock("next/navigation", () => ({
    useSearchParams: () => ({
        useSearchParams: jest.fn(),
        get: () => 3
    }),
    useRouter: () => ({
        push: jest.fn()
    }),
}));

describe('WebServiceViewer', () => {
    const iframeTitle = "main-iframe";
    const webServices = [
        { id: 1, name: "Docsify", url: "https://www.blog.example.com", thumbnailPath: "/webservices/Docsify.png", sortOrder: 1 },
        { id: 2, name: "Grafana", url: "https://www.monitoring.example.com", thumbnailPath: "/webservices/Grafana.png", sortOrder: 2 }
    ];

    it('should renders correctly when no web service are provided', () => {
        const { container } = render(<WebServiceViewer webServices={[]} />);
        expect(container).toMatchSnapshot();
        const iframe = screen.queryByTitle(iframeTitle);
        expect(iframe).not.toBeInTheDocument();
    });

    it('should return the first web service if no query parameter is provided', async () => {
        render(<WebServiceViewer webServices={webServices} />);
        const iframe = screen.getByTitle(iframeTitle);
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('src', webServices[0].url);
    });

    it('should return the first matching web service if a query parameter is provided', async () => {
        var expectedWebService = { id: 3, name: "Prometheus", url: "https://www.prometheus.example.com", thumbnailPath: "/webservices/Prometheus.png", sortOrder: 3 };
        render(<WebServiceViewer webServices={[...webServices, expectedWebService]} />);
        const iframe = screen.getByTitle(iframeTitle);
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('src', expectedWebService.url);
    });
});