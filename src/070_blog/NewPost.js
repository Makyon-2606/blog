import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT_BLOG } from './consts/const';
import { addAuthUserBlog as addAuthUserBlogActions } from './store/modules/authUserState';

/**
 * 新規投稿画面
 */
const NewPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUserProfile = useSelector((state) => state.user.authUserProfile);
  const authUserBlogPosts = useSelector(
    (state) => state.user.authUserBlog.posts
  );
  const [title, setTitle] = useState(''); // タイトルの入力値の状態管理
  const [titleErrorFlag, setTitleErrorFlag] = useState(false); // タイトルのエラーフラグ

  const [content, setContent] = useState(''); // 文章の入力値の状態管理
  const [contentErrorFlag, setContentErrorFlag] = useState(false); // 文章のエラーフラグ

  const [disabledFlag, setDisabledFlag] = useState(true); // 投稿ボタンの活性フラグ

  /**
   * バリデーションチェック関数を呼び出す処理
   *
   * @validateNewPost 新規投稿のバリデーションチェック関数
   * @param {string} title 新規投稿のタイトル
   * @param {string} content 新規投稿の文章
   */
  useEffect(() => {
    validateNewPost();
  }, [title, content]);

  /**
   * 新規投稿のバリデーションチェック関数
   *
   * @param {string} title 新規投稿のタイトル
   * @param {string} content 新規投稿の文章
   * @param {boolean} setTitleErrorFlag タイトルのエラーフラグの更新関数
   * @param {boolean} setContentErrorFlag 文章のエラーフラグの更新関数
   * @param {boolean} setDisabledFlag 投稿ボタンの活性フラグの更新関数
   * @titleTooLong titleが31文字以上であるかの真偽値
   * @contentTooLong contentgが501文字以上であるかの真偽値
   * @isDisabled タイトルか文章がエラーに該当しているかの真偽値
   */
  const validateNewPost = () => {
    const titleTooLong = title.length > 30;
    setTitleErrorFlag(titleTooLong);

    const contentTooLong = content.length > 500;
    setContentErrorFlag(contentTooLong);

    const isDisabled = titleTooLong || contentTooLong || !title || !content;
    setDisabledFlag(isDisabled);
  };

  /**
   * ブログを新規投稿する非同期関数
   *
   * @param {Event} e イベント
   * @param {string} title タイトル
   * @param {string} content 文章
   * @newPost 新規投稿データ
   * @updatedPosts postsプロパティに追加するデータを新規作成したデータ（既存postsデータ＋新規投稿データ）
   * @addAuthUserBlogActions state.authUserBlogにデータを追加するアクションクリエーター
   */
  const postSubmit = async (e) => {
    e.preventDefault(); // フォームのデフォルト送信を防止

    const newPost = {
      postDate: new Date().toISOString(),
      title,
      content,
    };

    try {
      const updatedPosts = [...authUserBlogPosts, newPost];

      await axios.put(`${ENDPOINT_BLOG}/${authUserProfile.id}`, {
        posts: updatedPosts,
      });

      dispatch(addAuthUserBlogActions(updatedPosts));
      navigate('/mypage');
    } catch (e) {
      console.error('Error adding new post:', e);
    }

    // try {
    //   // まず、ユーザのブログの既存データを取得
    //   const res = await axios.get(`${ENDPOINT_BLOG}?id=${userState.id}`);
    //   const blogData = res.data[0];

    //   console.log(authUserBlog); // posts全体のデータ（配列）
    //   console.log(blogData); // 合致するidが含まれているpostsオブジェクト

    //   // posts配列に新しいポストを追加
    //   const updatedPosts = [...blogData.posts, newPost];

    //   // オブジェクト全体を更新する
    //   await axios.put(`${ENDPOINT_BLOG}/${userState.id}`, {
    //     ...blogData,
    //     posts: updatedPosts,
    //   });

    //   // const res = await axios.post(
    //   //   `${ENDPOINT_BLOG}/keyId=${userState.id}/posts`,
    //   //   newPost
    //   // );
    // } catch (e) {
    //   console.error('Error adding new post:', e);
    // }
  };

  return (
    <>
      <form onSubmit={postSubmit} className=''>
        <div className='new-post-title-area'>
          <textarea
            className={`new-post-title-textbox new-post-title-textbox-${titleErrorFlag}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p
            className={`new-post-title-length new-post-title-length-${titleErrorFlag}`}
          >{`${title.length}文字 / 30文字`}</p>
        </div>
        <div className='new-post-content-area'>
          <textarea
            className={`new-post-content-textbox new-post-content-textbox-${contentErrorFlag}`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p
            className={`new-post-content-length new-post-content-length-${contentErrorFlag}`}
          >{`${content.length}文字 / 500文字`}</p>
        </div>
        <button
          type='submit'
          className={`submit-button new-post-submit-button 
          ${disabledFlag ? 'submit-button-disabled' : ''}`}
          disabled={disabledFlag}
        >
          投稿
        </button>
      </form>
    </>
  );
};

export default NewPost;
