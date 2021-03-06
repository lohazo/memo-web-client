(function (angular) {
  'use strict';
  /*jslint browser:true */

  function AppConfig($routeProvider, $locationProvider,
    $httpProvider, FacebookProvider, GooglePlusProvider, $logProvider, $translateProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider.when('/', {
      templateUrl: '_index.html'
    });

    $routeProvider.when('/authenticate', {
      resolve: ['$route', '$window', '$timeout', '$localStorage',
        function ($route, $window, $timeout, $localStorage) {
          var authToken = $route.current.params.auth_token;
          $localStorage.auth.user = {
            auth_token: authToken
          };
          $localStorage.auth.loggedIn = true;
          $timeout(function () {
            $window.location.href = '/';
          }, 100);
        }
      ]
    });

    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.interceptors.push('HttpInterceptor');

    FacebookProvider.init({
      appId: '856714854352716',
      version: 'v2.1'
    });

    GooglePlusProvider.init({
      clientId: '968128090898-e768ucu099tgsn5sli4nms46pp6jttt7.apps.googleusercontent.com',
      apiKey: 'AIzaSyAgi3H6TUcL_3lo6YL4YtZ1HWau0Fs8eog',
      scopes: 'https://www.googleapis.com/auth/plus.login ' +
        'https://www.googleapis.com/auth/userinfo.email ' +
        'https://www.googleapis.com/auth/userinfo.profile'
    });

    // $translateProvider.useSanitizeValueStrategy('sanitize');

    $translateProvider.translations('vi', {
      BTN_LOGIN: 'Đăng nhập',
      BTN_SIGNUP: 'Tạo tài khoản',
      BTN_FACEBOOK_LOGIN: 'Facebook',
      BTN_GOOGLE_LOGIN: 'Google',
      BTN_START_APP: 'BẮT ĐẦU NGAY',
      BTN_JOIN_APP: 'Tham gia ngay',
      BTN_HOME: 'Trang chủ',
      BTN_FORUM: 'Thảo luận',
      BTN_WORDS: 'Từ vựng',
      BTN_JOB: 'CƠ HỘI VIỆC LÀM!',
      BTN_PLAZA: 'Memo Plaza',
      BTN_FINISH_CHECKPOINT: 'Bạn đã vượt qua checkpoint này',
      BTN_SEARCH_FACEBOOK_FRIEND: 'Tìm bạn trên Facebook',
      BTN_SEARCH_FRIEND: 'Tìm kiếm',
      BTN_INVITE_FRIEND: 'Mời',
      BTN_REPORT: 'Báo lỗi, góp ý',
      BTN_SEND: 'Gửi',
      BTN_CANCEL: 'Hủy',
      BTN_SAVE_CHANGES: 'Lưu thay đổi',
      BTN_VIEW_COURSE: 'Xem tất cả các khóa học ngôn ngữ',
      BTN_CONNECT: 'Kết nối',
      BTN_DISCONNECT: 'Ngắt kết nối',
      BTN_REPLAY_EXAM: 'Làm lại',
      BTN_START_EXAM: 'Bắt đầu',
      BTN_LOCK_EXAM: 'Khóa',
      BTN_SHORTCUT_EXAM: 'Vượt rào',
      BTN_SKIP: 'Bỏ qua',
      BTN_CONTINUE: 'Tiếp tục',
      BTN_CHECK: 'Kiểm tra',
      BTN_REPORT_BUG: 'Báo lỗi',
      BTN_DICUSSION: 'Thảo luận',
      BTN_GOTO_HOME: 'Trở về trang chủ',
      BTN_FOLLOW: 'Theo dõi',
      BTN_UNFOLLOW: 'Đang theo dõi',
      BTN_CREATE_POST: 'Tạo chủ đề mới',
      BTN_SELECT_SUBSCRIPTION: 'Chọn kênh thảo luận',
      BTN_SHARE: 'Chia sẻ',
      BTN_BACK_TO_LESSON: 'Quay lại bài học',
      BTN_ACCEPT_CONFIRM: 'Bắt đầu bài kiểm tra',
      BTN_CANCEL_CONFIRM: 'Chưa phải lúc này',
      BTN_BACK: 'Trở lại',
      BTN_START_TUTORIAL: 'Bắt đầu bài hướng dẫn',
      BTN_CONTINUE_TUTORIAL: 'Tiếp tục xem hướng dẫn',
      BTN_VIEW_PLAZA: 'Tham quan Plaza',
      BTN_GO_TO_PLAZA: 'Vào Plaza',
      BTN_START_COURSE: 'Bắt đầu khóa học',
      BTN_QUIT: 'Thoát',
      BTN_CONTINUE_EXAM: 'Tiếp tục làm bài',
      BTN_QUIT_TUTORIAL: 'Bắt đầu học',
      BTN_OPEN: 'Mở',
      BTN_SEND_DISCUSSION: 'Gửi bình luận',
      BTN_LOGIN_TO_FOLLOW_POST: 'Đăng nhập để theo dõi chủ đề',
      BTN_LOGIN_TO_CREATE_POST: 'Đăng nhập để tạo chủ đề',
      BTN_ADD_FRIEND: 'Kết bạn',
      BTN_ADDED_FRIEND: 'Đã thêm vào danh sách bạn bè',
      BTN_SKIP_TUTORIAL: 'Bỏ qua hướng dẫn',
      BTN_RETURN: 'Quay lại',
      BTN_SEARCH: 'Tìm kiếm',
      BTN_GET_T_SHIRT: 'Nhận áo phông',
      BTN_GET_T_SHIRT_GUIDE: 'Hướng dẫn nhận áo',
      BTN_STRENGTHEN_EXAM: 'Củng cố kĩ năng',
      BTN_JOIN_EVENT: 'THAM GIA NGAY',
      BTN_REGISTER: 'Đăng ký',
      BTN_BUY_NOW: 'MUA NGAY',
      BTN_LEARN_NOW: 'TÌM HIỂU NGAY',

      LABEL_REFERRAL_CODE: 'Nhập code từ bạn bè',
      LABEL_OWNER_MEMOCOIN: 'Bạn đang có',
      LABEL_COURSE_EN: 'Tiếng Anh',
      LABEL_COURSE_FR: 'Tiếng Pháp',
      LABEL_COURSE_TH: 'Tiếng Thái',
      LABEL_ACCOUNT: 'Thông tin tài khoản',
      LABEL_LEARN_COURSE: 'Học ngôn ngữ',
      LABEL_PROFILE: 'Thông tin cá nhân',
      LABEL_NOTIFICATION: 'Thông báo',
      LABEL_USER_PROFILE: 'Hồ sơ cá nhân',
      LABEL_SETTINGS: 'Cài đặt',
      LABEL_KEYBOARD_SHORTCUT: 'Phím tắt bàn phím',
      LABEL_LOG_OUT: 'Đăng xuất',
      LABEL_ALL_POST: 'Tất cả',
      LABEL_FOLLOWING_POST: 'Đang theo dõi',
      LABEL_SEARCH_POST: 'Kết quả tìm kiếm',
      LABEL_SEND_EMAIL_NOTIFICATION: 'Gửi mail cho tôi khi',
      LABEL_NOTIFICATION_DO_EXAM: 'Nhắc nhở làm bài',
      LABEL_NOTIFICATION_FOLLOW: 'Khi có người theo dõi',
      LABEL_NOTIFICATION_BE_OVERCOME: 'Khi có người vượt qua',
      LABEL_OPEN: 'Mở',
      LABEL_CLOSE: 'Tắt',
      LABEL_CHECK_BOX_1: 'Tiếng Anh không được tự nhiên hoặc có lỗi',
      LABEL_CHECK_BOX_2: 'Các gợi ý nghĩa của từ khi di chuột sai hoặc có lỗi',
      LABEL_CHECK_BOX_3: 'Âm thanh không chính xác',

      TEXT_TOPICA_MEMO: 'TOPICA Memo',
      TEXT_ITEM_PROGRESS_QUIZ_WARNING_TEXT: 'Bài làm của bạn sẽ bị mất. Bạn có chắc chắn muốn thoát không?',
      TEXT_STRENGTHEN_EXAM: 'Luyện tập củng cố kĩ năng',
      TEXT_STRENGTHEN: 'Độ mạnh',
      TEXT_LIST_JOB_TITLE: 'Danh sách việc làm',
      TEXT_HOT_LINE_TO_APPLY_JOB: '0972865329',
      TEXT_APPLE_BY_HOT_LINE: 'Hoặc gọi tới HOT LINE',
      TEXT_EMAIL_TO_APPLY_JOB: ' memo@topica.edu.vn',
      TEXT_APPLY_BY_EMAIL: 'Gửi email kèm CV của bạn tới',
      TEXT_APPLY_JOB_TITLE: 'Bạn muốn ứng tuyển vị trí này ?',
      TEXT_JOB_INFORMATION_TITLE: "Thông tin công việc",
      TEXT_SEARCH_JOB: 'Tìm kiếm việc làm',
      TEXT_EXAM: 'Ví dụ',
      TEXT_TRANSLATE_MEANING: 'Dịch nghĩa',
      TEXT_STRENGTH_LEVEL_4: 'Vẫn nhớ tốt',
      TEXT_STRENGTH_LEVEL_3: 'Nhớ khá tốt',
      TEXT_STRENGTH_LEVEL_2: 'Cần ôn tập',
      TEXT_STRENGTH_LEVEL_1: 'Quên rồi!',
      TEXT_STRENGTH_GAP: 'Độ nhớ',
      TEXT_PRE_EXCERCIES: 'Lần ôn tập cuối',
      TEXT_MAX_SKILL_CONTENT: 'Bạn đã học hết bảng kỹ năng tiếng Anh rồi,<br> nhưng đừng quên phải luôn luyện tập nhé!',
      TEXT_MAX_SKILL_TITLE: 'Chúc mừng bạn đã phá đảo',
      TEXT_CONFIRM_ANSWER_PROGRESS_QUIZ: 'Đã gửi câu trả lời:<span class="lighter" style="display:block;font-weight:lighter;font-size: 22px;">Lựa chọn "Tiếp tục" để chuyển sang câu hỏi kế tiếp</span>',
      TEXT_QUESTION_NO: 'Câu hỏi số:',
      TEXT_FINISH_PROGRESS_QUIZ_CONTENT: 'Bạn hoàn toàn có thể làm lại Bài kiểm tra này<br />bằng cách truy cập vào <a ng-href="/plaza">Plaza</a> nhé!',
      TEXT_POINT: 'Điểm',
      TEXT_WEAKEST_WORD_HOOK: 'Cố giữ những thanh hiển thị độ mạnh luôn đầy vì qua thời gian các thanh sẽ giảm dần khi quên từ vựng',
      TEXT_AND: 'và',
      TEXT_TO_USE_MEMO_COIN: 'Sử dụng Memo Coin để mua những vật phẩm từ',
      TEXT_FINISH_AFFECTED_SKILL_TITLE: 'hoàn thành kỹ năng',
      TEXT_AFFECTED_SKILL_TITLE: 'Hoàn tất kỹ năng',
      TEXT_GET_BONUS: 'Bạn đã nhận được',
      TEXT_BONUS_HEART: 'Thưởng thêm trái tim',
      TEXT_FINISH_LESSON: 'Bài học kết thúc!',
      TEXT_FORM_QUESTION_TITLE: 'Chọn từ còn thiếu',
      TEXT_QUESTION_FAILURE: 'Bạn đã không hoàn thành được bài kiểm tra',
      TEXT_MEMO: 'Memo',
      TEXT_MEMO_INFO_1: 'sẽ liên tục phát triển và đưa ra các khoá học mới,',
      TEXT_MEMO_INFO_2: 'Bạn luôn có thể chọn học thêm một ngôn ngữ khác bất kì lúc nào.',
      TEXT_CHOOSE_COURSE: 'Chọn khóa học',
      TEXT_DISCUSSION_CONTENT: 'Trong quá trình làm bài, nếu đáp án của bạn có vẻ đúng nhưng không được chấp nhận, làm ơn bấm nút báo lỗi và chọn mục tương ứng để thông báo cho bọn mình. Vui lòng không báo lỗi hoặc đề nghị đáp án đúng tại đây.',
      TEXT_DISCUSSION_QUESTION: 'Thảo luận câu này với người học khác',
      TEXT_FOLLOW_POST: 'Theo dõi chủ đề',
      TEXT_UNFOLLOW_POST: 'Bỏ theo dõi',
      TEXT_GET_SCHOLAR_TOPICA_NATIVE: 'Nhận học bổng',
      TEXT_LEARN_TOPICA_NATIVE: 'Tìm hiểu TOPICA Native',
      TEXT_SCHOLAR_NATIVE_MONEY: '500,000 VND',
      TEXT_OF: 'của',
      TEXT_OR: 'hoặc',
      TEXT_TOPICA_NATIVE: 'TOPICA Native',
      TEXT_SHARE_CODE: 'Nhập ngay để nhận 3 MemoCoin nào!',
      TEXT_SHARE_CODE_CONTENT: 'Nếu bạn bè bạn đang học Memo, đừng quên nhập code chia sẻ của họ để nhận MemoCoin nhé!',
      TEXT_GET_REFERRAL_CODE: 'Bạn đã nhập code của',
      TEXT_FOLLOW_FRIEND: 'Thêm',
      TEXT_UNFOLLOW_FRIEND: 'Bạn bè',
      TEXT_SEARCH_FRIEND: 'Tìm kiếm',
      TEXT_SEARCH_FACEBOOK_FRIEND: 'Mời bạn Facebook',
      TEXT_LEADERBOARD: 'Bảng xếp hạng',
      TEXT_INVITE_FRIEND_BY_EMAIL_TITLE: 'Mời thêm bạn bè',
      TEXT_INVITE_FRIEND_BY_EMAIL: 'Nhập địa chỉ email của bạn bè để gửi họ lời mời',
      TEXT_ITEM: 'VẬT PHẨM',
      TEXT_LESSON: 'Bài học',
      TEXT_SHARE: 'Chia sẻ',
      TEXT_INVITED: 'Đã mời được:',
      TEXT_FRIEND: 'bạn',
      TEXT_SHARE_REFERRAL_CODE: 'Code chia sẻ:',
      TEXT_INVITE_FRIEND: 'Memo sẽ trở nên thú vị hơn khi học cùng bạn bè. Rủ bạn học ngay nhé!',
      TEXT_UTILITY_TITLE: 'Lợi ích:',
      TEXT_FIRST_UTILITY: 'Cùng học tiếng Anh',
      TEXT_SECOND_UTILITY: 'So tài đua top BXH',
      TEXT_THIRD_UTILITY: 'Cùng nhận 3 MemoCoin',
      TEXT_VERSION: 'Phiên bản v1.0.3',
      TEXT_FEEDBACK: 'Chào bạn. Nếu bạn tìm ra lỗi của <span style="color: #810c15;font-weight: bold">TOPICA MEMO</span> xin vui lòng góp ý cho chúng tôi tại đây. Xin cảm ơn!',
      TEXT_REPORT: 'Báo lỗi',
      TEXT_REFERRAL_CODE: 'Nhận 3 MemoCoin khi nhập code chia sẻ từ bạn bè',
      TEXT_PLAZA: 'Plaza',
      TEXT_MEMO_COIN: 'MemoCoin',
      TEXT_EXP: 'XP',
      TEXT_LUCKY_STAR: 'Ngôi sao may mắn',   
      TEXT_COMBO_PROTECT_DAILY_GIFT: 'Streak_freeze',
      TEXT_BUY_GUIDE: 'Hướng dẫn mua vật phẩm',
      TEXT_INVITE_FRIEND_GUIDE: 'Hướng dẫn mời bạn bè',
      TEXT_ITEM_HEALTH_POTION: 'Bình hồi máu',
      TEXT_ITEM_HEALTH_POTION_DESCRIPTION: 'Bạn sẽ có thêm 1 Máu trong trường hợp bạn đã mất hết Máu khi thực hiện một bài học.',
      TEXT_ITEM_LUCKY_START: 'Ngôi sao may mắn',
      TEXT_ITEM_LUCKY_START_DESCRIPTION: 'Đặt cược 7 MemoCoin, bạn sẽ nhận được 14 MemoCoin nếu làm bài liên tục trong 7 ngày',
      TEXT_ITEM_PROGRESS_QUIZ: 'Bài kiểm tra Tiếng Anh',
      TEXT_ITEM_PROGRESS_QUIZ_DESCRIPTION: 'Bạn sẽ biết được trình độ của mình ngay sau khi làm bài kiểm tra tiếng Anh',
      TEXT_ITEM_T_SHIRT: 'Áo phông Kiến Memo',
      TEXT_ITEM_T_SHIRT_DESCRIPTION: 'Mỗi tháng, chỉ có 200 học viên đủ combo 5 có cơ hội giành được chiếc áo phông Kiến Memo vô cùng đáng yêu này!',
      TEXT_ITEM_GIFT_1M: 'Gói học bổng 500,000 VNĐ',
      TEXT_ITEM_GIFT_1M_DESCRIPTION: 'Học ít nhất 5 ngày liên tiếp để sở hữu học bổng trị giá 500,000 VNĐ của Topica Native - chương trình luyện nói với 100+ giáo viên Âu, Úc, Mỹ dành cho người đủ 18 tuổi trở lên. GIẢM GIÁ TRỰC TIẾP vào học phí ngay khi đăng ký một khóa bất kỳ!',
      TEXT_MEMO_COIN_INFO: 'MemoCoin là gì?',
      TEXT_MEMO_COIN_DESCRIPTION: 'MemoCoin là đơn vị tiền tệ ảo của Topica Memo. Càng học nhiều trên TOPICA Memo, bạn càng nhận được nhiều MemoCoin để mua vật phẩm trong cửa hàng! Dưới đây là một số cách có thể nhận được MemoCoin:',
      TEXT_LEVEL_UP: 'Thăng cấp',
      TEXT_LEVEL_UP_DESCRIPTION: 'Nhận số MemoCoin tương đương với cấp độ đạt được (Ví dụ: lên cấp độ 2 được 2 MemoCoin, cấp độ 3 được 3 MemoCoin,...)',
      TEXT_FINISH_SKILL: 'Hoàn thành một kỹ năng',
      TEXT_FINISH_SKILL_DESCRIPTION: 'Nhận được 2 MemoCoin khi hoàn tất một kĩ năng',
      TEXT_FULL_HEALTH: 'Đủ số máu',
      TEXT_FULL_HEALTH_DESCRIPTION: 'Nhận được 1 MemoCoin khi hoàn tất một bài học mà vẫn đủ số máu',
      TEXT_COMBO_DAY: 'ngày combo',
      TEXT_COMBO_DAY_DESCRIPTION: 'Nhận được 1 MemoCoin cho mỗi 10 ngày học liên tục (Ví dụ: 1 MemoCoin cho 10 ngày, 2 MemoCoin cho 20 ngày,...)',
      TEXT_INVITE: 'Mời bạn bè',
      TEXT_INVITE_DESCRIPTION: 'Mời 1 người bạn vào TOPICA Memo, khi người đó đăng ký bằng code chia sẻ của bạn thì cả 2 sẽ nhận dc 3 MemoCoin.',
      TEXT_NOTE_TITLE: 'Ghi chú',
      TEXT_MEMO_COIN_FIRST_NOTE: 'Nếu thăng cấp hoặc hoàn tất các kỹ năng bằng bài vượt rào hoặc kiểm tra rút ngắn kỹ năng, người học sẽ không nhận được MemoCoin',
      TEXT_MEMO_COIN_SECOND_NOTE: 'Mỗi người học sẽ được nhận ngay một code chia sẻ trong lần đầu tiên đăng nhập TOPICA Memo.',
      TEXT_DAY_COMBO: 'ngày Combo',
      TEXT_NO_NOTIFICATION: 'Bạn không có thông báo nào',
      TEXT_SHORTCUT_KEYBOARD_TITLE: 'Phím tắt bàn phím trong quá trình làm bài',
      TEXT_SHORTCUT_CHOOSE_ANSWER: 'Chọn một hoặc nhiều câu trả lời',
      TEXT_SHORTCUT_ENTER_KEYBOARD: 'Bạn có thể ấn vào phím Enter để trả lời câu hỏi!',
      TEXT_SHORTCUT_SUBMIT_ANSWER: 'Nhập đáp án',
      TEXT_PROFILE_SETTING: 'Cài đặt tài khoản',
      TEXT_USER_NAME: 'Tên đăng nhập',
      TEXT_EMAIL: 'Email',
      TEXT_PHONE: 'Điện thoại',
      TEXT_MICRO: 'Micro',
      TEXT_SPEAKER: 'Loa',
      TEXT_SETTING_SPEAKER: 'Tự động phát giọng nói',
      TEXT_SETTING_SOUND: 'Hiệu ứng âm thanh',
      TEXT_SETTING_PROFILE_PICTURE: 'Hình ảnh hồ sơ',
      TEXT_PASSWORD: 'Mật khẩu',
      TEXT_NEW_PASSWORD: 'Mật khẩu mới',
      TEXT_CONFIRM_PASSWORD: 'Xác nhận mật khẩu',
      TEXT_LANGUAGE: 'Ngôn ngữ',
      TEXT_SELECT_COURSE: 'Học ngôn ngữ',
      TEXT_USER_INFO: 'Thông tin cá nhân',
      TEXT_FULL_NAME: 'Tên đầy đủ',
      TEXT_CREATED_AT: 'Học tập từ',
      TEXT_CONNECT_NAME: 'Bạn đã được kết nối dưới tên',
      TEXT_CONNECT_FACEBOOK: 'Kết nối Facebook',
      TEXT_CONNECT_GOOGLE: 'Kết nối Google+',
      TEXT_NOTIFICATION: 'Thông báo',
      TEXT_SEND_EMAIL_NOTIFICATION: 'Gửi email cho tôi khi :',
      TEXT_LIST_POST_TITLE: 'Danh sách các chủ đề',
      TEXT_SEARCH_POST: 'Tìm kiếm chủ đề',
      TEXT_CREAT_POST_TITLE: 'Tiêu đề thảo luận',
      TEXT_CREAT_POST_CONTENT: 'Nội dung thảo luận',
      TEXT_HAVE: 'Có',
      TEXT_COMMENT: 'Bình luận',
      TEXT_SKILL: 'Kĩ năng',
      TEXT_SHOW_MORE: 'Xem thêm',
      TEXT_SUBSCRIPTIONS: 'Kênh theo dõi',
      TEXT_SKIP_TUTORIAL: 'Bỏ qua bài hướng dẫn',
      TEXT_TUTORIAL_WELCOME: 'Xin chào! Tôi là Kiến Memo và bây giờ, tôi rất vui mừng khi được hướng dẫn bạn cách sử dụng Topica Memo nhé!',
      TEXT_SHOW_DICTIONARY_POPUP: 'Bấm vào hoặc đưa trỏ chuột tới những từ vựng này để xem nghĩa',
      TEXT_REPORT_POPUP: 'Lựa chọn báo lỗi và vui lòng góp ý cho Memo khi cảm thấy câu trả lời của bạn là đúng. Những góp ý của bạn sẽ giúp nội dung của Memo hoàn thiện hơn.',
      TEXT_CLAIM_BONUS_TUTORIAL_TITLE: 'Chúc mừng bạn đã hoàn thành các bước cơ bản',
      TEXT_CLAIM_BONUS_TUTORIAL_CONTENT: 'Kiến Memo dành tặng bạn 5 MemoCoin để bắt đầu hành trình chinh phục những ngoại ngữ mới nhé!',
      TEXT_MEMO_COIN_DESCRIPTION_TUTORIAL: 'MemoCoin là đơn vị tiền tệ ảo trong Memo, giúp bạn có thể mua các vật phẩm thú vị trong',
      TEXT_FINISH_TUTORIAL_TITLE: 'Chúc mừng bạn đã hoàn thành bài hướng dẫn!',
      TEXT_FINISH_TUTORIAL_CONTENT: 'Nỗ lực nhỏ mỗi ngày sẽ mang lại thành công lớn cho bạn. Tranh thủ từng phút và tiến bộ ngay cùng Memo!',
      TEXT_ANSWER: 'Đáp án',
      TEXT_QUIT: 'Thoát',
      TEXT_CORRECT_ANSWER: 'Đáp án đúng:',
      TEXT_CORRECT: 'Chính xác',
      TEXT_HELLO_MEMO: 'Xin chào, tên tôi là Memo.',
      TEXT_LISTEN_QUESTION_TITLE: 'Gõ những gì bạn vừa nghe',
      TEXT_TRANSLATE_QUESTION_TITLE: 'Dịch nội dung này',
      TEXT_JUDGE_QUESTION_TITLE: 'Đánh dấu <u>tất cả</u> đáp án đúng',
      TEXT_NAME_QUESTION_TITLE: 'Dịch',
      TEXT_SELECT_QUESTION_TITLE: 'Chọn nghĩa của từ',
      TEXT_SPEAK_QUESTION_TITLE: 'Nhấp vào micro và dịch sang Tiếng Anh',
      TEXT_RESULT_ANSWER: 'Bạn có lỗi nhỏ',
      TEXT_EXAM_TITLE: 'Lựa chọn bài học',
      TEXT_SKILL_CO_BAN_1: 'Cơ bản 1',
      TEXT_DAILY_GIFT_MEMO_COIN_TITLE: 'Bạn nhận được một phần quà hàng ngày từ Kiến Memo. Cùng khám phá nào!',
      TEXT_DAILY_GIFT_SCHOLARSHIP_NATIVE_TITLE: 'Chúc mừng, hôm nay bạn đã nhận được gói học bổng trị giá',
      TEXT_OPEN_DAILY_GIFT: 'Chúc mừng, hôm nay bạn đã nhận được',
      TEXT_DAILY_GIFT_CONTENT: 'chúc bạn có một ngày học tập vui vẻ cùng Kiến Memo',
      TEXT_PLACEMENT_TEST_SKILL_QUESTION: 'Bạn muốn học tiếng Anh từ đầu?',
      TEXT_PLACEMENT_TEST_SKILL_HOOK: 'Hãy bắt đầu từ bài dễ nhất - Cơ bản 1',
      TEXT_PLACEMENT_TEST_TITLE: 'Kiểm tra đầu vào',
      TEXT_PLACEMENT_TEST_QUESTION: 'Hay bạn muốn làm bài Kiểm tra đầu vào?',
      TEXT_PLACEMENT_TEST_HOOK: 'Chỉ mất 10 phút, bạn sẽ được bắt đầu học đúng với trình độ của mình',
      TEXT_NEXT: 'Tiếp theo',
      TEXT_PREVIOUS: 'Trước',
      TEXT_FIRST: 'Đầu',
      TEXT_LAST: 'Cuối',
      TEXT_FORGOT_PASSWORD: 'Quên mật khẩu',
      TEXT_REGISTER_WITH_ONE_CLICK: 'Đăng kí với 1 click để tìm và thi đua với bạn bè',
      TEXT_LOGIN: 'Đăng nhập',
      TEXT_ENTER_REFERAL_CODE: '(Bạn có thể nhập code từ bạn bè ngay sau khi đăng nhập)',
      TEXT_DONOT_HAVE_ACCOUNT: 'Chưa có tài khoản ?',
      TEXT_REGISTER_NOW: 'Đăng ký ngay',
      TEXT_FOOTER_LANDING_PAGE: 'MEMO - Ứng dụng học tiếng Anh duy nhất trên các nền tảng smartphone.',
      TEXT_SA_1_HEAD_LANDING_PAGE: 'Học tiếng Anh',
      TEXT_SA_2_HEAD_LANDING_PAGE: 'Miễn phí trọn đời',
      TEXT_SHOW_LOGIC_CTA: 'Hãy đăng nhập để điền code chia sẻ',
      TEXT_TITLE_INFO_LANDING_PAGE: 'Học thỏa thích trên <span class="pressed">MỌI THIẾT BỊ</span>',
      TEXT_SA_1_INFO_LANDING_PAGE: 'Cách tốt nhất để học tiếng Anh',
      TEXT_SA_2_INFO_LANDING_PAGE: 'Học mọi lúc mọi nơi, không chỉ trên máy tính. Với Memo, bạn có thể luyện tập ngay trên smartphone và tablet.',
      TEXT_SB_1_1_SB_LANDING_PAGE: 'Mỗi bài học là một trò chơi',
      TEXT_SB_1_2_SB_LANDING_PAGE: 'Vừa học vừa chơi sẽ giúp bạn học được nhiều ngôn ngữ mới. Thử thách thú vị mỗi ngày, tham gia ngay',
      TEXT_SB_2_1_SB_LANDING_PAGE: 'Giỏi tiếng Anh với 5 phút tự học mỗi ngày',
      TEXT_SB_2_2_SB_LANDING_PAGE: 'Nỗ lực nhỏ mỗi ngày sẽ mang lại thành công lớn cho bạn. Tranh thủ từng phút và tiến bộ ngay cùng Memo.',
      TEXT_LEARN_NOW: 'Học ngay',
      TEXT_SOLOGAN_1_LANDING_PAGE: '5 phút mỗi ngày để trở thành',
      TEXT_SOLOGAN_2_LANDING_PAGE: 'CHUYÊN GIA NGÔN NGỮ',
      TEXT_SUBJECT_STATISTIC_LANDING_PAGE: 'Chủ đề',
      TEXT_LESSON_STATISTIC_LANDING_PAGE: 'Bài học',
      TEXT_SPECILIZATION_STATISTIC_LANDING_PAGE: 'Từ chuyên đề',
      TEXT_SENTENCE_STATISTIC_LANDING_PAGE: 'Mẫu câu',
      TEXT_CAMPAIGN: 'Tham gia với TOPICA Memo trước ngày 20/1 để nhận học bổng luyện nói tiếng Anh với thầy Tây tại TOPICA Native trị giá lên tới: <span style="font-weight: 700;color: #810c15;">900,000 vnđ</span>!',
      TEXT_DEAL_MAY: 'Chương trình ưu đãi tháng 5!<br> <p style="font-size: 13px;line-height: 25px;margin-bottom: 15px;font-weight: 600;"> Học bổng tiếng Anh 500.000 VNĐ</p>',
      TEXT_SCHOLARSHIP_500K: 'Học bổng tiếng Anh 500.000 VNĐ',
      TEXT_NATIVE_INFO: 'Luyện nói tiếng Anh online với 100% Giáo viên Âu Úc Mỹ',
      TEXT_CAN_APPLY_JOB: 'Ứng tuyển vị trí này',
      TEXT_APPLIED_JOB: 'Đã ứng tuyển vị trí này',
      TEXT_LOGIN_TO_APPLY_JOB: 'Để ứng tuyển vị trí này, bạn cần có tài khoản tại TOPICA Memo',
      TEXT_APPLY_FOR_POSITION: 'Bạn đang ứng tuyển vị trí',
      TEXT_DONOT_INFORMATION: 'Bạn chưa điền thông tin',
      TEXT_INFORMATION_ERROR: 'Thông tin của bạn chưa chính xác',
      TEXT_DONOT_UPLOAD_CV: 'Bạn chưa chọn file CV để upload',
      TEXT_REQUIRED: 'Các trường hợp đánh dấu <span class="required-text">(*)</span> là bắt buộc',
      TEXT_INTRO: 'Giới thiệu',
      TEXT_CV_IMPORT: 'CV đính kèm',
      TEXT_FORMAT_CV: 'Hỗ trợ định dạng .doc, docx, .pdf nhỏ hơn 512KB',
      TEXT_UPLOAD_CV: 'Gửi hồ sơ',
      TEXT_NATIVE_SCHOLARY_DEADLINE: 'Áp dụng cho tất cả học viên đã từng có 03 ngày học liên tiếp <br> (từ nay đến hết 10/5)',
      TEXT_SALES_OFF: 'Chỉ còn',
      TEXT_TOOLTIP_INPUT_EMAIL: 'Nhập email của bạn vào',
      TEXT_TOOLTIP_COMBO: 'Combo là số ngày bạn học Memo liên tiếp.',
      TEXT_TOOTIP_XP: 'Xp là điểm kinh nghiệm tích lũy khi làm xong bài.',
      TEXT_TOOLTIP_MEMO_COIN: 'MemoCoin là tiền ảo dùng để mua đồ trong Plaza!',
      TEXT_TOOLTIP_NOT_ENOUGHT_MEMOCOIN: 'Không đủ MemoCoin',
      TEXT_TOOLTIP_SHORTCUT_EXAM: 'Vượt rào để hoàn thành kỹ năng này mà không cần làm từng bài học',
      TEXT_TOOLTIP_CHECKPOINT: 'Làm bài kiểm tra về kiến thức của tất cả các kĩ năng phía trên để nhanh chóng vượt qua những kĩ năng đó',
      TEXT_TOOLTIP_CHECK_STAGE: 'Lựa chọn báo lỗi và vui lòng góp ý cho Memo khi cảm thấy câu trả lời của bạn là đúng. Những góp ý của bạn sẽ giúp nội dung của Memo hoàn thiện hơn.',
      TEXT_TOOLTIP_SHORTCUT_KEYBOARD_1: 'Chọn phím tắt 1 để lựa chọn câu trả lời',
      TEXT_TOOLTIP_SHORTCUT_KEYBOARD_2: 'Chọn phím tắt 2 để lựa chọn câu trả lời',
      TEXT_TOOLTIP_SHORTCUT_KEYBOARD_3: 'Chọn phím tắt 3 để lựa chọn câu trả lời',
      TEXT_TOOLTIP_STICKY_POST: 'Những chủ đề nổi bật',
      TEXT_TOOLTIP_VOTE: 'Đăng nhập để vote',
      TEXT_TOOLTIP_ENTER_USERNAME: 'Tên đăng nhập chứa 6 đến 14 ký tự, bao gồm các ký tự a-z, A-Z, 0-9. Không được có ký tự đặc biệt hay dấu cách.',
      TEXT_TOOLTIP_EMAIL: 'Nhập email chính xác sẽ gíup Memo song hành cũng bạn trong suốt qúa trình học',
      TEXT_TOOLTIP_PASSWORD: 'Hãy ghi nhớ mật khẩu của bạn, cẩn thận kẻo quên nhé :3',
      TEXT_TOOLTIP_PHONE: 'Nhập số điện thoại chính xác sẽ giups Memo có thể dễ dàng hỗ trợ bạn hơn',
      TEXT_TOOLTIP_REFERAL_CODE: 'Điền code chia sẻ bạn nhận được tại đây',
      TEXT_PLACEHOLDER_TRANSLATE_TO: 'Dịch sang tiếng Việt...',
      TEXT_PLACEHOLDER_SEARCH_FACEBOOK_FRIEND: 'Tìm bạn',
      TEXT_PLACEHOLDER_SEARCH_FRIEND: 'Tên hoặc email',
      TEXT_PLACEHOLDER_FEEDBACK: 'Mô tả vấn đề của bạn',
      TEXT_PLACEHOLDER_LISTEN_QUESTION: 'Nhập đáp án ...',
      TEXT_PLACEHOLDER_NAME_QUESTION: 'Đáp án ...',
      TEXT_PLACEHOLDER_SEARCH_JOB: 'Nhập từ khóa',
      TEXT_PLACEHOLDER_SEARCH_JOB_BY_WORK: 'Chọn ngành nghề',
      TEXT_PLACEHOLDER_SEARCH_JOB_BY_LOCATION: 'Chọn nơi làm việc',
      TEXT_PLACEHOLDER_LOGIN: 'Tên đăng nhập',
      TEXT_PLACEHOLDER_USER_NAME: 'Tên đăng nhập hoặc email',
      TEXT_PLACEHOLDER_EMAIL: 'Email (VD: example@gmail.com)',
      TEXT_PLACEHOLDER_PASSWORD: 'Mật khẩu',
      TEXT_PLACEHOLDER_PHONE: 'Điện thoại (không bắt buộc)',
      TEXT_PLACEHOLDER_REFERAL_CODE: 'Code chia sẻ từ bạn bè (không bắt buộc)',
    });

    $translateProvider.preferredLanguage('vi');
  }

  // Declare app level module which depends on filters, and services
  angular.module('app', [
    'ngRoute', 'ngStorage', 'ngAudio', 'ngCookies', 'angular.filter',
    'mm.foundation', 'angles', 'facebook', 'googleplus',
    'angular-loading-bar', 'angularMoment', 'angulartics', 'angulartics.google.analytics',
    'angularFileUpload',
    'pascalprecht.translate',
    'app.controllers', 'app.directives',
    'header', 'footer', 'landingpage', 'login', 'home', 'course',
    'profile', 'skill', 'report', 'exam',
    'feedback', 'settings', 'plaza', 'gamification', 'leaderboard', 'tracking', 'welcome',
    'words', 'referral', 'question',
    'notification', 'download', 'adsense', 'forum', 'job', 'memo.dropdown', 'weakestWord',
    'popup', 'banner', 'island', 'badge','angular-svg-round-progress'
  ]).config(['$routeProvider', '$locationProvider', '$httpProvider', 'FacebookProvider',
    'GooglePlusProvider', '$logProvider', '$translateProvider',
    AppConfig
  ]).run(['$rootScope', '$templateCache', '$location', '$localStorage', 'amMoment', function (
    $rootScope, $templateCache, $location, $localStorage, amMoment) {
    amMoment.changeLocale('vi');

    var notRequireLoginPaths = {
      '/': true,
      '/authenticate': true,
      '/download': true,
      '/forum': true
    };

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
      if (typeof (current) !== 'undefined') {
        $templateCache.remove(current.templateUrl);
      }

      if ($localStorage.auth) {
        if (!$localStorage.auth.loggedIn && notRequireLoginPaths[
            next.originPath]) {
          $location.url('/');
        }
      } else {
        $location.url('/');
      }
    });

    $rootScope.$on("$routeChangeSuccess", function (event) {
      if ($location.search().error && $location.search().error == 401) {
        $localStorage.$reset();
        $localStorage.auth = {
          loggedIn: false,
          trial: false
        }
        $rootScope.$broadcast('event:auth-logoutConfirmed');
        if ($location.host().match(/(^memo.|.net.vn$|.local$)/g)) {
          alert(
            'Bạn hoặc ai đó đã đăng nhập vào tài khoản này trên thiết bị khác. Vui lòng đăng nhập lại!'
          );
        }
      }
    });
  }]);

}(window.angular));