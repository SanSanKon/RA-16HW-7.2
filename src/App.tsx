import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

interface NewProps {
  children: React.ReactNode;
}

function New(props: NewProps) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
};

interface PopularProps {
  children: React.ReactNode
}

function Popular(props: PopularProps) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
};

function withPopularity<T extends { views: number }>(WrappedComponent: React.FC<T>){
  return function PopularityWrapper(props: T) {
    const { views } = props;
    if (views >= 1000) {
      return <Popular>{<WrappedComponent {...props} />}</Popular>
    } else {
     return <New>{<WrappedComponent {...props} />}</New> 
    }
  }
}

interface ArticleProps {
  title: string;
  views: number;
}

function Article(props: ArticleProps) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
};

interface VideoProps {
  url: string;
  views: number;
}

function Video(props: VideoProps) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};

const ArticleWithPopularity = withPopularity(Article);
const VideoWithPopularity = withPopularity(Video);

interface ListItem {
  type: 'video' | 'article';
  url?: string;
  title?: string;
  views: number;
}

interface ListProps {
  list: ListItem[];
}

function List(props: ListProps) {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return (
                    <VideoWithPopularity {...item} key={uuidv4()} />
                );

            case 'article':
                return (
                    <ArticleWithPopularity {...item} key={uuidv4()} />
                );
            default:
              return null;
        }
    });
};

export default function App() {
    const [list, setList] = useState<ListItem[]>([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list} />
    );
}