export default function SpellCard({
  data: { name, casting_time, classes, desc },
}) {
  return (
    <div>
      <h2>{name}</h2>
      <span>{casting_time}</span>
      {/* {classes.map((class_name, index) => {
        return <span key={index + class_name}>{class_name}</span>;
      })} */}
      <p>{desc}</p>
    </div>
  );
}
