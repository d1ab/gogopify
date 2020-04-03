module.exports = {
    addons: [
        "@storybook/addon-actions",
        "@storybook/addon-links",
        "@storybook/preset-create-react-app",
        "@storybook/addon-backgrounds/register",
        "@storybook/addon-knobs",
        // "@storybook/addon-storyshots",
        {
            name: "@storybook/addon-docs",
            options: {
                configureJSX: true
            }
        }
    ]
};
