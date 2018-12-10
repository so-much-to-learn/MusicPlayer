import {
    observable, 
    flow,
    action
} from 'mobx';
import Services from '../services';
class Store {
    @observable title: string = "";
    fetchTitle = flow(function *(this: Store) {
        try {
            const title: string = yield Services.fetchTitle();
            this.title = title;
        } catch (err) {
            console.log(err);
        }
    }).bind(this)
}
export default new Store();