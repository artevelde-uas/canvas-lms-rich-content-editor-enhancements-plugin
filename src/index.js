import './index.global.css';
import styles from './index.module.css';


export default function (app, options) {
    function routeHandler(params, routeName) {
        app.addReadyListener('.ic-RichContentEditor', richContentEditor => {
            var htmlEditor = richContentEditor.querySelector('textarea');

            Promise.race([
                app.addReadyListener(richContentEditor, '.mce-tinymce'),
                app.addReadyListener(richContentEditor, '.tox-tinymce')
            ]).then(tinymce => {
                var buttons, switchViewsLink;

                // Detect new TinyMCE
                if (tinymce.classList.contains('tox-tinymce')) {
                    switchViewsLink = richContentEditor.querySelector('span[role="toolbar"] > span:nth-last-child(2) > button');
                    switchViewsLink.style.display = 'none';
                } else {
                    // Pages tool has different mark-up
                    if (/^courses\.pages(\.edit)?$/.test(routeName)) {
                        buttons = richContentEditor.parentNode.querySelector('.switch_views_container');
                        switchViewsLink = buttons.querySelector('a.switch_views');
                    } else {
                        buttons = richContentEditor.parentNode.firstElementChild;
                        switchViewsLink = buttons.querySelector('a.rte_switch_views_link');
                    }

                    buttons.classList.add(styles.buttons);
                }

                // Create the tabs
                richContentEditor.insertAdjacentHTML('afterbegin', `
                    <div class="ui-tabs-minimal ui-tabs ui-widget ui-widget-content ui-corner-all">
                        <ul class="${styles.tabs} ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist">
                            <li class="${styles.richContentEditor} ui-state-default ui-corner-top ui-tabs-active ui-state-active" role="tab">
                                <a class="ui-tabs-anchor" role="presentation">Rich Content Editor</a>
                            </li>
                            <li class="${styles.htmlEditor} ui-state-default ui-corner-top" role="tab">
                                <a class="ui-tabs-anchor" role="presentation">HTML Editor</a>
                            </li>
                        </ul>
                    </div>
                `);

                let tabs = wrapper.parentNode.querySelector(`.${styles.tabs}`);
                let richContentEditorTab = tabs.querySelector(`.${styles.richContentEditor}`);
                let htmlEditorTab = tabs.querySelector(`.${styles.htmlEditor}`);

                // Handle clicks on tabs
                tabs.addEventListener('click', event => {
                    var currentTab = tabs.querySelector('.ui-tabs-active');
                    var selectedTab = event.target.closest('li');

                    if (selectedTab === null || selectedTab === currentTab) return;

                    currentTab.classList.remove('ui-tabs-active', 'ui-state-active');
                    selectedTab.classList.add('ui-tabs-active', 'ui-state-active');

                    if ((selectedTab === richContentEditorTab && tinymce.style.display === 'none') ||
                        (selectedTab === htmlEditorTab && htmlEditor.style.display === 'none')) {
                        switchViewsLink.click();
                    }
                });
            });
        });
    }

    app.addRouteListener('courses.pages', routeHandler);
    app.addRouteListener('courses.pages.edit', routeHandler);
    app.addRouteListener('courses.announcements.new', routeHandler);
    app.addRouteListener('courses.assignments.new', routeHandler);
    app.addRouteListener('courses.assignments.edit', routeHandler);
    app.addRouteListener('courses.discussions.new', routeHandler);
    app.addRouteListener('courses.discussions.edit', routeHandler);
}
