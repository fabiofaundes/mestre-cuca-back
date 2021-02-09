const standardErrorHandler = (res) => {
    return (err) => {
        res.status(err.status)
            .send(JSON.stringify(err))
    }
}

exports.standardErrorHandler = standardErrorHandler