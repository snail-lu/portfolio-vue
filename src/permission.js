/* eslint-disable prefer-const */
import router from './router'
import NProgress from 'nprogress' // progress bar
import Cookies from 'js-cookie'
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
	// start progress bar
	NProgress.start()

	// set page title
	document.title = getPageTitle(to.meta.title)

	// determine whether the user has logged in
	// const hasLogin = localStorage.getItem("hasLogin") || Cookies.get('accessToken')
	const hasLogin = true
	if (hasLogin) {
		next()
		NProgress.done()
	} else if (to.path === '/login') {
		// if is logged in, redirect to the home page
		next()
		NProgress.done()
	} else {
		// other pages that do not have permission to access are redirected to the login page.
		next({ path: 'login' })
		NProgress.done()
	}
})

router.afterEach(() => {
	// finish progress bar
	NProgress.done()
})
