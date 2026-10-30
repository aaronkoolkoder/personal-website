export default function Hero() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative -mb-10 h-[clamp(190px,26vw,300px)] w-full overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent_92%)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mountains.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[50%_32%] [animation:drift_60s_ease-in-out_infinite_alternate]"
      />
    </div>
  );
}
