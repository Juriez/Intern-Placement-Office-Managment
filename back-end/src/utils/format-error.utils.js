const formatError = (joiErrorDetails) => {
    return joiErrorDetails?.map((error) => error.message);
};

module.exports = { formatError };
