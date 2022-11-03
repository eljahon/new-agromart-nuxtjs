import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUserSecret,
  faUsers,
  faBriefcase,
  faCalendar,
  faFile,
  faHome,
  faChartBar,
  faSlidersH,
  faCogs,
  faChevronDown,
  faChevronUp,
  faUserEdit,
  faTrashAlt,
  faTimes,
  faExclamationTriangle,
  faPlus,
  faSearch,
  faTimesCircle,
  faPhoneAlt,
  faVideo,
  faEllipsisV,
  faMicrophone,
  faImage,
  faPaperPlane,
  faPaperclip,
  faBars,
  faEdit,
  faBold,
  faItalic,
  faStrikethrough,
  faUnderline
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import App from '../App'

library.add(
  faUserSecret,
  faUsers,
  faBriefcase,
  faCalendar,
  faFile,
  faHome,
  faChartBar,
  faSlidersH,
  faCogs,
  faChevronDown,
  faChevronUp,
  faUserEdit,
  faTrashAlt,
  faTimes,
  faExclamationTriangle,
  faPlus,
  faSearch,
  faTimesCircle,
  faPhoneAlt,
  faVideo,
  faEllipsisV,
  faMicrophone,
  faImage,
  faPaperPlane,
  faPaperclip,
  faBars,
  faEdit,
  faBold,
  faItalic,
  faStrikethrough,
  faUnderline
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)

Vue.config.productionTip = false
