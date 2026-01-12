import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ContactWidget from "./components/ContactWidget";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: '--font-playfair',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: '--font-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Christian Oh - The Accidental Investor",
    description: "From bankruptcy to owning 8 properties by age 27. Real Estate Practitioner, Investor, and Director of Investments at JNA.",
    keywords: ["real estate", "property investment", "Singapore", "PropNex", "Christian Oh"],
    authors: [{ name: "Christian Oh" }],
    openGraph: {
        title: "Christian Oh - The Accidental Investor",
        description: "From bankruptcy to owning 8 properties by age 27. I don't just sell real estate; I engineer wealth portfolios.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
            <body className={inter.className} suppressHydrationWarning={true}>
                {children}
                <ContactWidget />
            </body>
        </html>
    );
}
