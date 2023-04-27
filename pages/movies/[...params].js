import HeadTitle from "@/components/headTitle";

export default function Detail({params}) {
  const [title, id] = params || [];
    return (
        <div>
            <HeadTitle title={title}/>
            <h4>{title || "Loading..."}</h4>
        </div>

    );
}

export function getServerSideProps({params:{params}}) {

    return {
        props: {
            params,
        },
    };
}