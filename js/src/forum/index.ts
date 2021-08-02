import registerWidget from '../common/registerWidget';

app.initializers.add('afrux/news-widget', () => {
  registerWidget(app);
});
