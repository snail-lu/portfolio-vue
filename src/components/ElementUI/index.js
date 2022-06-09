import { Button, Col, Icon, Link, Loading, Menu, MenuItem, Pagination, Row, Table, TableColumn, Tooltip, Tree, Upload } from 'element-ui'

const ElementUIs = [Button, Col, Icon, Link, Loading, Menu, MenuItem, Pagination, Row, Table, TableColumn, Tooltip, Tree, Upload]

export default {
    install(Vue) {
        ElementUIs.forEach((ElementUI) => {
            Vue.use(ElementUI)
        })
    }
}
