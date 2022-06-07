/* eslint-disable prefer-const */
import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // 加载进度条
    NProgress.start()

    // 设置网页标签title
    document.title = getPageTitle(to.meta.title)
    next()
    NProgress.done()
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
