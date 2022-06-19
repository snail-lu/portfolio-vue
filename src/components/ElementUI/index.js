import {
    Button,
    ButtonGroup,
    Calendar,
    Col,
    Collapse,
    CollapseItem,
    Icon,
    Link,
    Loading,
    Pagination,
    Row,
    Table,
    TableColumn,
    Tooltip,
    Tree,
    Upload
} from 'element-ui'

const ElementUIs = [
    Button,
    ButtonGroup,
    Calendar,
    Col,
    Collapse,
    CollapseItem,
    Icon,
    Link,
    Loading,
    Pagination,
    Row,
    Table,
    TableColumn,
    Tooltip,
    Tree,
    Upload
]

export default {
    install(Vue) {
        ElementUIs.forEach((ElementUI) => {
            Vue.use(ElementUI)
        })
    }
}
