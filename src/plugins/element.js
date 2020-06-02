import Vue from 'vue'
import { Button, Card, Form, Input, FormItem,
         Message, Link, Container, Header, Main,
		 Tabs, TabPane, Menu, MenuItem, Submenu,
		 Avatar, DropdownMenu, DropdownItem, Dropdown,
		 Dialog, Badge, Table, TableColumn, DatePicker,
		 Radio, Upload, MessageBox
		}  
 
   from 'element-ui'

Vue.use(Button)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Link)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Avatar)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dropdown)
Vue.use(Dialog)
Vue.use(Badge)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(Radio)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm