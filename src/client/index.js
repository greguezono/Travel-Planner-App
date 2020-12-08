import './styles/style.scss'
import './media/banner.jpg'
import './media/trip1.jpg'
import './media/trip2.jpeg'
import './media/trip3.jpg'

import { validateForm } from './js/formValidator'
import { handleSubmit } from './js/formHandler'
import { 
    removeTrip,
    createTripSection
} from './js/docHandler'

export {
    validateForm,
    handleSubmit,
    removeTrip,
    createTripSection
}