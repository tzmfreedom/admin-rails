//= require vue/dist/vue.min
//= require axios/dist/axios.min
//= require vue-spinner/dist/vue-spinner.min

Vue.component('hello-world', {
    template: '<p>Hello! </p>'
});

var PulseLoader = VueSpinner.PulseLoader;

const quoteId = (function() {
    let m = location.pathname.match(/\/([^/]+)$/);
    if (m && m[1] == 'new') {
        return 'new';
    }
    m = location.pathname.match(/\/([^/]+)\/edit$/);
    return m[1];
})();

const POST_URL = '/admin/quotes';
const FETCH_URL = '/admin/quotes/' + quoteId + '.json';

const CSRF_TOKEN = $('meta[name=csrf-token]').attr('content');

let quote = { name: '', quoted_at: '', contact: '' };
let details = [];


let deleteIds = [];
let vm = new Vue({
    el: '#form',
    data: {
        quote: quote,
        details: details,
        seen: false
    },
    methods: {
        addRow: function() {
            this.details.push({
                item_name: '',
                price: 100,
                quantity: 0,
            })
        },
        create: function() {
            var body = {
                name: this.quote.name,
                quoted_at: this.quote.quoted_at,
                contact: this.quote.contact,
                quote_details: this.details,
                delete_ids: deleteIds,
            };
            if (quoteId != 'new') body.id = quoteId;

            axios.post(POST_URL, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': CSRF_TOKEN,
                },
            }).then(function(res) {
                alert('レコードを保存しました');
            }).catch(function(res) {
                debugger;
            });
        },
        deleteRow: function(index){
            deleteIds.push(this.details[index].id);
            this.details.splice(index, 1);
        },
    },
    mounted: function() {
        if (quoteId == 'new') return;

        axios.get(FETCH_URL)
            .then(function(r) {
                vm.quote.name = r.data.name;
                vm.quote.quoted_at = r.data.quoted_at;
                vm.quote.contact = r.data.contact;

                vm.details = r.data.quote_details;
            });
    },
    components: {
        'PulseLoader': PulseLoader,
    }
});

