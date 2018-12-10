class Services {
    fetchTitle = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("home")
            }, 2000);
        })
    }
}
export default new Services();