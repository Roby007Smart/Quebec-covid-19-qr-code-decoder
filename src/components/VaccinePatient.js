import { publicKey } from "../utilities/jws-utils"

export default {
    name: 'VaccinePatient',
    data() {
        return {
            showRawDataDialog: false,
            showValidationDialog: false,
        }
    },
    props: {
        patients: [],
        rawData: null,
        dataValidated: false,
    },
    methods: {
    },
    computed:{
        publicKey(){
            return publicKey;
        }
    }
}
