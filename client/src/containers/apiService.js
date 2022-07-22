export default class apiService {
    static postProducts(body) {
        return fetch("http://localhost:3001/api/insert/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }).then((resp) => resp.json());
      }

      static postSold(body) {
        return fetch("http://localhost:3001/api/sold/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }).then((resp) => resp.json());
      }
}
