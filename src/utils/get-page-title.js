import defaultSettings from '@/settings';

const title = defaultSettings.title || '';

export default function getPageTitle(pageTitle, showPageTitleOnly = false) {
    if (showPageTitleOnly && pageTitle) {
        return `${pageTitle}`;
    } else if (pageTitle) {
        return `${title} | ${pageTitle}`;
    }
    return `${title}`;
}
