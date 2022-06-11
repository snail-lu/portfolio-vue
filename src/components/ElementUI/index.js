import { Button, Col, Collapse, CollapseItem, Icon, Link, Loading, Pagination, Row, Table, TableColumn, Tooltip, Tree, Upload } from 'element-ui'

const ElementUIs = [Button, Col, Collapse, CollapseItem, Icon, Link, Loading, Pagination, Row, Table, TableColumn, Tooltip, Tree, Upload]

export default {
    install(Vue) {
        ElementUIs.forEach((ElementUI) => {
            Vue.use(ElementUI)
        })
    }
}
