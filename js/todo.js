// 【Todo】
// 1. 追加ボタンを押下した際にタスクを追加する
// 2. Todoタスクのチェックボックスを押下した際にタスクをDoneにする
// 3. Doneタスクのチェックボックスを押下した際にタスクをTodoタスクに戻す
// 4. ゴミ箱アイコンを押下した際にタスクを削除する
// 5. Todoタスクのテキストエリアをクリックした際に入力できるようにし、Shift+Enterにて修正を確定する
// 6. 検索エリアに入力したテキスト内容に前方一致するTodoタスクのみ表示させる

// 【1. 追加ボタンを押下した際にタスクを追加する】
// イベント発火(追加ボタンを押下した時)
// 期待動作：取得(Todo追加のinputの値)
// 期待動作：表示(Todoリストにinput欄のテキストをTodoタスクとして追加)

$('.js-add-todo').on('click', function (e) {
    e.preventDefault();

    var error = $('.js-toggle-error');
    var getVal = $('.js-get-val');

    // inputの値を取得し、中身を空にする
    var text = getVal.val();
    getVal.val('');

    // 入力が空の場合エラーを表示する
    if (!text) {
        error.show();
        return;
    }

    //  エラーを隠す(表示されている可能性があるため)
    error.hide();

    // listItemのhtmlを生成してタスクを追加する
    var listItem = '<li class="list__item js-todo_list-item" data-text="' + text + '">' +
        '<i class="far fa-square icon-check js-click-done" aria-hidden="true"></i>' +
        '<span class="js-todo_list-text">' + text + '</span>' +
        '<input type="text" class="editText js-todo_list-editForm" value="' + text + '">' +
        '<i class="fa fa-trash icon-trash js-click-trash" aria-hidden="true"></i>' +
        '</li>';

    $('.js-todo_list').prepend(listItem);
});

// 【2. Todoタスクのチェックボックスを押下した際にタスクをDoneにする】
// イベント発火(Todoタスクのチェックボックスを押下した時)
// 期待動作：①変更(クリックしたDOMをdoneのアイコンに変更)
// 期待動作：②変更(クリックしたDOMのクラス名js-click-doneをjs-click-todoに変更)
// 期待動作：③取得(クリックしたDOMから辿ってlist__itemのDOMを取得)
// 期待動作：④変更(list__itemのクラス名をDoneのものに変更)

$(document).on('click', '.js-click-done', function () {
    $(this).removeClass('fa-square').addClass('fa-check-square')
        .removeClass('js-click-done').addClass('js-click-todo')
        .closest('.js-todo_list-item').addClass('list__item--done')
});

// 【3. Doneタスクのチェックボックスを押下した際にタスクをTodoタスクに戻す】
// イベント発火(Doneタスクのチェックボックスを押下した時)
// 期待動作：①変更(クリックしたDOMをTodoのアイコンに変更)
// 期待動作：②変更(クリックしたDOMのクラス名js-click-todoをjs-click-doneに変更)
// 期待動作：③取得(クリックしたDOMから辿ってlist__itemのDOMを取得)
// 期待動作：④変更(list__itemのクラス名をTodoのものに変更)

$(document).on('click', '.js-click-todo', function () {
    $(this).removeClass('fa-check-square').addClass('fa-square')
        .removeClass('js-click-todo').addClass('js-click-done')
        .closest('.js-todo_list-item').removeClass('list__item--done')
});

// 【4. ゴミ箱アイコンを押下した際にタスクを削除する】
// イベント発火(ゴミ箱アイコンを押下した時)
// 期待動作：削除(クリックしたDOMから辿ってlist__itemのDOMを削除)

$(document).on('click', '.js-click-trash', function () {
    $(this).closest('.js-todo_list-item').fadeOut('slow', function () {
        $(this).remove();
    });
});

// 【5. Todoタスクのテキストエリアをクリックした際に入力できるようにし、Shift+Enterにて修正を確定する】
// イベント発火(テキストをクリックした時)
// 期待動作：①変更(クリックしたDOMを非表示にし、兄弟要素の入力エリアを表示する)
// イベント発火(テキストを編集後、Shift+Enterを押下した時)

$(document).on('click', '.js-todo_list-text', function () {
    $(this).hide().siblings('.js-todo_list-editForm').show();
});
// 期待動作：③変更(元のテキストを編集後のテキストに置き換え、編集エリアを非表示、テキストエリアを表示する)
// CtrlやShift、Altと何かキーを同時に押す場合は、専用のイベントがあるのでkeyCodeで指定しても効かないので注意

$(document).on('keyup', '.js-todo_list-editForm', function (e) {
    if (e.keyCode === 13 && e.shiftKey === true) {
        var $this = $(this);
        $this.hide().siblings('.js-todo_list-text').text($this.val()).show()
            .closest('.js-todo_list-item').attr('data-text', $this.val());
    }
});

// 【6. 検索エリアに入力したテキスト内容に前方一致するTodoタスクのみ表示させる】
// イベント発火(検索エリアに入力があった時)
// 期待動作：①取得(全てのlist__itemのDOMを取得し、ループで個々に展開)
// 期待動作：②マッチしないものを非表示にする

$('.js-search').on('keyup', function () { // changeはフォーカスアウトでイベントが発火するので、今回はタイムリーな反映のためにkeyupを使う
    var searchText = $(this).val();

    $('.js-todo_list-item').show().each(function (i, elm) { // i = index, elm = element
        var text = $(elm).data('text');
        var regexp = new RegExp('^' + searchText);

        if (text && text.match(regexp)) {
            return true;
        }
        $(elm).hide();
    })
});