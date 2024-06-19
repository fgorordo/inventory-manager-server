export const getEnvironment = () => {
    return process.env.NODE_ENVIRONMENT === 'development' ? ".development.env" : ".env"
}