import Button from 'flarum/common/components/Button';
import registerWidget from '../common/registerWidget';

app.initializers.add('afrux/news-widget', () => {
  registerWidget(app);

  const settingKey = 'afrux-news-widget.lines';

  app.extensionData
    .for('afrux-news-widget')
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <Button
            className="Button"
            onclick={() => {
              const value = JSON.parse(this.setting(settingKey)() || '[]');

              this.setting(settingKey)(JSON.stringify([...value, '']));
            }}
          >
            {app.translator.trans('afrux-news-widget.admin.settings.add_line')}
          </Button>
        </div>
      );
    })
    .registerSetting(function () {
      const value = JSON.parse(this.setting(settingKey)() || '[]');

      if (!value.length) return;

      return (
        <div className="Form-group">
          <label>{app.translator.trans('afrux-news-widget.admin.settings.lines')}</label>
          {value.map((line: string, index: number) => (
            <div className="Afrux-NewsWidget-lineSetting">
              <textarea
                className="FormControl"
                oninput={(e: any) => {
                  value[index] = e.target.value;
                  this.setting(settingKey)(JSON.stringify([...value]));
                }}
              >
                {line}
              </textarea>
              <Button
                className="Button Button--icon"
                icon="fas fa-trash"
                onclick={() => {
                  this.setting(settingKey)(JSON.stringify([...value.filter((l: string, i: number) => i !== index)]));
                }}
              />
            </div>
          ))}
        </div>
      );
    });
});
