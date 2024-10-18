import type {Config} from 'tailwindcss'
import {nextui} from '@nextui-org/react'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            boxShadow: {
                'spread-card': '0px 2px 14px 0px rgba(34, 135, 157, 0.65)',
            },
            backdropBlur: {
                'spread-card': '26px',
            },
            backgroundImage: {
                'gradient-with-image': "linear-gradient(180deg, rgba(14, 23, 36, 0.25) 0%, #0E1724 40%), url('/Background.png')",
                'gradient-with-image-chat': "linear-gradient(180deg, rgba(14, 23, 36, 0.25) 0%, #0E1724 40%), url('/mainBackground.png')",
                'gradient-main': "linear-gradient(180deg, rgba(14, 23, 36, 0) 0%, #0E1724 95%)",
                'gradient-main-chat': "linear-gradient(180deg, rgba(14, 23, 36, 0) 0%, #0E1724 95%), url('/mainBackground.png')",
                'gradient-main-right': "linear-gradient(180deg, rgba(14, 23, 36, 0) 0%, #0E1724 95%), url('/chatBackground.png')",
            },
            animation: {
                scaleUpDown: 'scaleUpDown 2s ease-in-out infinite',
                scaleUpDown2: 'scaleUpDown 2s ease-in-out 0.3s infinite',
                scaleUpDown3: 'scaleUpDown 2s ease-in-out 0.6s infinite',
            },
            keyframes: {
                scaleUpDown: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '30%': { transform: 'scale(1.3)' },
                },
            },
        },
    },
    plugins: [nextui({
        layout: {
            // spacingUnit: 4, // in px
            disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
            dividerWeight: '1px', // h-divider the default height applied to the divider component
            fontSize: {
                tiny: '0.75rem', // text-tiny
                small: '0.875rem', // text-small
                medium: '1rem', // text-medium
                large: '1.125rem', // text-large
            },
            lineHeight: {
                tiny: '1rem', // text-tiny
                small: '1.25rem', // text-small
                medium: '1.5rem', // text-medium
                large: '1.75rem', // text-large
            },
            radius: {
                small: '4px', // rounded-small
                medium: '8px', // rounded-medium
                large: '12px', // rounded-large
            },
            borderWidth: {
                small: '1px', // border-small
                medium: '2px', // border-medium (default)
                large: '3px', // border-large
            },
        },
        themes: {
            light: {
                layout: {
                    hoverOpacity: 0.8, //  this value is applied as opacity-[value] when the component is hovered
                    boxShadow: {
                        // shadow-small
                        small:
                            '0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)',
                        // shadow-medium
                        medium:
                            '0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)',
                        // shadow-large
                        large:
                            '0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)',
                    },
                },
            },
            dark: {
                layout: {
                    hoverOpacity: 0.9, //  this value is applied as opacity-[value] when the component is hovered
                    boxShadow: {
                        // shadow-small
                        small:
                            '0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)',
                        // shadow-medium
                        medium:
                            '0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)',
                        // shadow-large
                        large:
                            '0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)',
                    },
                },
            },
        },
    })],
}
export default config
