import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class PostsModel extends Model {
  @attr('string') title;
  @attr('string') content;
  @belongsTo('user') author;
  @hasMany('comments') comments;
  @hasMany('likes') likes;
}
