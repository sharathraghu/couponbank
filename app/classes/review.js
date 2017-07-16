class Review {

    constructor() {
        this._comments = "";
        this._rating = "";
        this._oneliner ="";
    }

    getComments() {
        return this._comments;
    }

    setComments(comments) {
        this._comments = comments;
    }

    getRating() {
        return rating;
    }

    setRating(rating) {
        this._rating = rating;
    }

    getOneliner() {
        return this._oneliner;
    }

    setOneliner(oneliner) {
        this._oneliner = oneliner;
    }
}

module.exports = Review;