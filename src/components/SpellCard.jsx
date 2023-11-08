export default function SpellCard({ data, handleDelete }) {
  const {
    name,
    casting_time,
    range,
    components,
    material,
    duration,
    desc,
    level,
    concentration,
    school: { index },
    higher_level,
    damage,
  } = data;
  let damage_at_slot_level;
  let damage_at_character_level;
  let damage_type;
  if (damage) {
    damage_at_slot_level = damage.damage_at_slot_level;
    damage_at_character_level = damage.damage_at_character_level;
    damage_type = damage.damage_type;
  }
  return (
    <div className="group border-2 border-black p-2 text-xs flex relative flex-col gap-2">
      <button
        onClick={() => {
          handleDelete();
        }}
        className="btn hidden group-hover:block
      absolute top-1 right-1
      p-2 btn-accent rounded-full btn-circle"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      <div className="flex">
        <h2 className="text-xl font-bold">{name}</h2>
        <div className="ml-auto flex flex-col">
          <p>
            Level {level} {index}
          </p>
          <p>{concentration}</p>
        </div>
      </div>
      <div className="border-2 border-black rounded-md">
        <div className="flex px-1 py-[0.1rem] gap-2">
          <i className="fa-regular fa-clock"></i>
          <p>{casting_time}</p>
        </div>
        <hr className="border-black" />
        <div className="flex px-1 py-[0.1rem] gap-2">
          <i className="fa-solid fa-share"></i>
          <p>{range}</p>
        </div>
        <hr className="border-black" />
        <div className="flex px-1 py-[0.1rem] gap-2">
          <i className="fa-solid fa-tag"></i>
          <p>
            {components}
            <span className="text-xs">{material && `(${material})`}</span>
          </p>
        </div>
        <hr className="border-black" />
        <div className="flex px-1 py-[0.1rem] gap-2">
          <i className="fa-solid fa-hourglass-half"></i>
          <p>{duration}</p>
        </div>
      </div>
      <p>{desc}</p>
      <div className="mt-auto">
        {(higher_level[0] || damage_at_character_level) && (
          <>
            <h4 className="font-semibold">At Higher Levels</h4>
            <p>{higher_level[0]}</p>
          </>
        )}
        {damage && (
          <div className="flex border border-black w-fit">
            {damage_at_slot_level &&
              Object.entries(damage_at_slot_level).map(
                ([key, index], ind, origin) => {
                  return (
                    <div
                      key={key + index}
                      className={
                        ind != origin.length - 1 ? "border-r border-black" : ""
                      }
                    >
                      <p className="text-center">{key}</p>
                      <hr className="border-black" />
                      <p className="px-[0.35rem] text-center font-semibold">
                        {index}
                      </p>
                    </div>
                  );
                }
              )}
            {damage_at_character_level &&
              Object.entries(damage_at_character_level).map(
                ([key, index], ind, origin) => {
                  return (
                    <div
                      key={key + index}
                      className={
                        ind != origin.length - 1 ? "border-r border-black" : ""
                      }
                    >
                      <p className="text-center">{key}</p>
                      <hr className="border-black" />
                      <p className="px-[0.35rem] text-center font-semibold">
                        {index}
                      </p>
                    </div>
                  );
                }
              )}
          </div>
        )}
      </div>
    </div>
  );
}
