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
    <div className="group border-2 border-black p-2 text-xs flex relative flex-col gap-2 print:h-[33vh]">
      <button
        onClick={() => {
          handleDelete();
        }}
        className={`btn
      absolute top-1 right-1
      p-2 btn-accent btn-circle
      hidden group-hover:block
      `}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      {/* Heading */}
      <div className="flex">
        <h2 className="text-xl font-bold flex-1 w-fit">{name}</h2>
        <div className="ml-auto flex flex-col">
          <p>
            {level} {index}
          </p>
          <p>{concentration}</p>
        </div>
      </div>
      {/* Specs */}
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
      {/* Description */}
      <div
        className={`text-xs ${
          (desc.join().length > 700 &&
            `print:text-[0.4rem] print:leading-tight`) ||
          (desc.join().length > 600 &&
            `print:text-[0.45rem] print:leading-tight`) ||
          (desc.join().length > 450 &&
            `print:text-[0.5rem] print:leading-tight`) ||
          (desc.join().length > 400 &&
            `print:text-[0.55rem] print:leading-tight`) ||
          (desc.join().length > 350 &&
            `print:text-[0.6rem] print:leading-tight`)
        }`}
      >
        <p className="">{desc}</p>
      </div>
      {/* Higher Levels */}
      <div className="mt-auto">
        {(higher_level || damage_at_character_level) && higher_level[0] && (
          <>
            <h4 className="font-semibold">At Higher Levels</h4>
            <p className="print:hidden">{higher_level && higher_level[0]}</p>
          </>
        )}
        {damage && (
          <div className="flex border border-black w-fit text-[0.5rem] ">
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
                      <p className="text-center leading-snug">{key}</p>
                      <hr className="border-black" />
                      <p className="px-[0.2rem] text-center font-semibold">
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
