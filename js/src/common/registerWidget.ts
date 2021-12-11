import type Application from 'flarum/common/Application';
import Widgets from 'flarum/extensions/afrux-forum-widgets-core/common/extend/Widgets';

import NewsWidget from './components/NewsWidget';

export default function (app: Application) {
  new Widgets()
    .add({
      key: 'news',
      component: NewsWidget,
      isDisabled: () => !app.forum.attribute('afrux-news-widget.lines').length,
      isUnique: true,
      placement: 'top',
      position: 1,
    })
    .extend(app, 'afrux-news-widget');
}
