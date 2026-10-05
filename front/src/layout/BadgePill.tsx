interface badgeSizes {
    text: string,
}

const BadgePill = ({text}: badgeSizes) => {

    return (
        <div className="badge-pill bg-card rounded-full text-sm px-3 py-0.5 my-3 text-center inline-block">
            <p>{text}</p>
        </div>
      );
}
 
export default BadgePill;