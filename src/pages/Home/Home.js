import classNames from 'classnames/bind';
import React from 'react';
import Banner from '~/components/partial/Banner/Banner';
import TransparentButton from '~/components/shared/buttons/TransparentButton';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import styles from './Home.module.scss';
const cb = classNames.bind(styles);

const contents = [
    {
        image: 'https://res.cloudinary.com/dqhuy/image/upload/v1667806029/MMFood/Topic/che-bach-qua-hat-sen_srsztu.jpg',
        title: 'Cách làm chè bạch quả hạt sen thanh nhiệt, tốt cho sức khỏe',
        content:
            'Chè bạch quả hạt sen được du nhập từ Trung Quốc, đến nay, chúng ta đều đã quen với món chè này, nhất là vào những ngày hè oi bức, sẽ thật tuyệt nếu được giải nhiệt bằng một bát chè bạch quả hạt sen thanh mát. Cách làm chè bạch quả hạt sen cũng không hề khó nhưng cần phải có một số lưu ý nhất định để có thể nấu chè ngon đúng vị. Trong bài viết dưới đây, MMFood sẽ mách bạn cách nấu sao cho chuẩn vị ngọt thanh, không bị đắng',
    },
    {
        image: 'https://res.cloudinary.com/dqhuy/image/upload/v1667806029/MMFood/Topic/banh-bi-do-flan_bky6th.jpg',
        title: 'Cách làm bánh bí đỏ Flan cho ngày hè nóng nực',
        content:
            'Theo các nghiên cứu khoa học, bí đỏ là một trong số ít những loại có hàm lượng sắt, axit hữu cơ, muối khoáng và vitamin cao. Chính vì vậy có rất nhiều các loại món ăn ngon đầy bổ dưỡng được làm từ bí đỏ, trong đó bao gồm cả các loại bánh. Bánh Flan bí đỏ Flan bí đỏ có vị ngọt thơm của lớp bí đỏ dẻo dẻo bao quanh lớp flan trứng mềm mịn sẽ là món ăn cực hấp dẫn không thể chối từ. Công thức làm bánh Flan bí đỏ khá đơn giản và món bánh này hứa hẹn sẽ mang đến cho bạn một bữa xế vừa ngon vừa bổ trong những ngày hè oi ả và nắng gắt',
    },
    {
        image: 'https://res.cloudinary.com/dqhuy/image/upload/v1667806029/MMFood/Topic/chao-thit-bo_zswgas.jpg',
        title: 'Bật mí những cách nấu cháo thịt bò thơm ngon',
        content:
            'Cháo thịt bò là món ăn rất quen thuộc của mỗi gia đình Việt. Đây là món ăn vừa thơm ngon, vừa cung cấp rất nhiều chất dinh dưỡng. Nếu bạn đang tìm kiếm một món ăn để chăm sóc sức khỏe của mình hoặc cho bé, cho người bệnh thì cháo thịt bò là sự lựa chọn không nên bỏ qua. Cách thực hiện món ăn này tuy đơn giản nhưng để giữ được độ ngon cũng như chất dinh dưỡng của thịt bò thì cần nắm được một vài bí quyết nhỏ. Cùng MMFood khám phá những cách nấu cháo thịt bò thơm ngon nhé!',
    },
    {
        image: 'https://res.cloudinary.com/dqhuy/image/upload/v1667806029/MMFood/Topic/goi-xoai-tom-kho_c4mpob.jpg',
        title: 'Cách làm gỏi xoài tôm khô cho cả gia đình',
        content:
            'Vừa đậm đà vừa thanh mát, món gỏi xoài tôm khô được rất nhiều người ưa thích. Cùng MMFood học cách làm món gỏi đơn giản cho cả nhà cùng thưởng thức nhé! Các món gỏi hay nộm luôn có sức hấp dẫn vô cùng đặc biệt trong mỗi mâm cơm gia đình Việt bởi sự thanh mát, dịu nhẹ của gỏi dễ dàng “đánh tan” cái ngấy của những bữa tiệc nhiều dầu mỡ thịt cá và món gỏi xoài tôm khô là một trong những món gỏi được nhiều gia đình ưa chuộng. Với vị chua tự nhiên của xoài, vị ngon khó cưỡng của nước mắm đường và vị ngọt dai của tôm khô khiến bạn ăn hoài không chán!',
    },
    {
        image: 'https://res.cloudinary.com/dqhuy/image/upload/v1667806030/MMFood/Topic/trung-cuon-han-quoc_o2f48y.png',
        title: 'Cách làm trứng cuộn Hàn Quốc đẹp mắt như trong phim',
        content:
            'Tuy trên phim chúng ta đã thấy cách làm trứng cuộn Hàn Quốc nhiều lần nhưng khi thực hành thì không dễ gì có thể có được thành phẩm vuông vức như vậy. Tuy trên phim chúng ta đã thấy cách làm trứng cuộn Hàn Quốc nhiều lần nhưng khi thực hành thì không dễ gì có thể có được thành phẩm vuông vức như vậy. Đặc biệt là với người Việt Nam đã quen với món trứng rán nên sẽ thường nhầm trứng cuộn và trứng rán là cùng cách làm nên rất khó có thể làm trứng cuộn thành công. Sau đâu, MMFood sẽ bật mí cho bạn cách làm trứng cuộn ngon mà lại đẹp mắt đúng kiểu phim Hàn.',
    },
];
class Home extends React.Component {
    state = {};
    render() {
        return (
            <>
                <Header />
                <div className={cb('home')}>
                    <Banner />
                    <div className={cb('main')}>
                        <div className={cb('background')}></div>
                        <div className={cb('wrapper')}>
                            {contents.map((item, index) => (
                                <ContentSection
                                    key={index}
                                    title={item.title}
                                    image={item.image}
                                    content={item.content}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}
const ContentSection = (props) => (
    <div className={cb('content-section')}>
        <div className={cb('image')}>
            <div>
                <img src={props.image} alt={props.title} />
            </div>
        </div>
        <div className={cb('contents')}>
            <h3 className={cb('title')}>{props.title}</h3>
            <p className={cb('text')}>{props.content}</p>
            <div className={cb('fixed-left')}>
                <TransparentButton>
                    <span>Xem thêm</span>
                </TransparentButton>
            </div>
        </div>
    </div>
);
export default Home;
