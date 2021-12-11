import type Mithril from 'mithril';
import app from 'flarum/common/app';
import icon from 'flarum/common/helpers/icon';
import classList from 'flarum/common/utils/classList';
import Stream from 'flarum/common/utils/Stream';

import Widget, { WidgetAttrs } from 'flarum/extensions/afrux-forum-widgets-core/common/components/Widget';

export default class NewsWidget<T extends WidgetAttrs> extends Widget<T> {
  private newslines!: string[];
  private line!: CallableFunction;
  private switching!: boolean;

  oninit(vnode: Mithril.Vnode<T, this>) {
    super.oninit(vnode);

    this.newslines = app.forum.attribute('afrux-news-widget.lines');
    this.line = Stream({ index: 0, text: this.newslines[0] });
    this.switching = false;
  }

  className() {
    return 'Afrux-NewsWidget';
  }

  icon() {
    return 'fas fa-bullhorn';
  }

  title() {
    return '';
  }

  content(): Mithril.Children {
    if (this.newslines.length > 1 && !this.switching) {
      this.switching = true;

      setTimeout(() => {
        const newLineIndex = (this.line().index + 1) % this.newslines.length;

        this.switching = false;
        this.line({ index: newLineIndex, text: this.newslines[newLineIndex] });
        m.redraw();
      }, 7000);
    }

    let prevLine: string;

    if (this.newslines.length > 1) {
      prevLine = this.newslines[(this.line().index - 1 + this.newslines.length) % this.newslines.length];
    }

    return (
      <div className="Afrux-NewsWidget-content">
        <div className="Afrux-NewsWidget-icon">{icon('fas fa-bullhorn')}</div>
        <div className="Afrux-NewsWidget-line-container">
          {this.newslines.map((line, index) => (
            <div
              className={classList([
                'Afrux-NewsWidget-line',
                this.line().index === index ? 'Afrux-NewsWidget-line--current' : '',
                prevLine === line ? 'Afrux-NewsWidget-line--previous' : '',
              ])}
              key={index}
            >
              {m.trust(line)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
