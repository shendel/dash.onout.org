import GA from 'react-ga';
import { MdEmail, MdChat } from "react-icons/md";
import { SiTelegram, SiDiscord } from "react-icons/si";
import useUser from "../../hooks/useUser";

import "./index.css";

const Footer = () => {

  const { state: { signed, subscribed } } = useUser();

  const links = [
    {
      to: "mailto:support@onout.org",
      title: "Email: support@onout.org",
      icon: <MdEmail size="2rem" className="icon" />,
      gaAction: "Write Email support",
    },
    {
      to: "https://support.onout.org/chat/widget/form/3882717100",
      title: "Online chat",
      icon: <MdChat size="1.9rem" className="icon" />,
      gaAction: "Open Online chat support",
    },
    {
      to: "https://t.me/onoutsupportbot",
      title: "Telegram",
      icon: <SiTelegram size="1.7rem" className="icon" />,
      gaAction: "Open Telegram support bot",
    },
    {
      to: "https://discord.gg/VwKEmHEgVN",
      title: "Discord",
      icon: <SiDiscord size="1.9rem" className="icon" />,
      gaAction: "Join to Discord channel",
    },
  ];

  return (
    <footer>
      {signed && subscribed && (
        <p className="footerRiskNotice">
          Risk notification: Our code is based on top audited sources, but our
          changes are unaudited from 3rd party auditors. We improve security but a
          lot of things are out of our control, for example, 3rd party software
          like WordPress, your server's software, your hosting provider. We have
          delivered dapps for hundreds of clients which handle tens of thousands
          of users. For the past 3 years, we have received about 10 incident
          reports kind of "a user lost funds". Unfortunately, not all of them have
          been resolved. Ask yourself who other than you can access your server?
          When was your last time installing security updates? The most secure
          choice would be our cloud solution (with a "revenue-share" payment
          model) contact support for more information. For WP standalone versions
          please use as less plugins as you can and the "Simply Static plugin" and
          "Wodefence" for security.
        </p>
      )}

      <ul className="linksList">
        {links.map(({ to, title, icon, gaAction }, index) => (
          <li className="linkItem" key={index}>
            <a
              href={to}
              target="_blank"
              rel="noreferrer"
              title={title}
              onClick={() => {
                GA.event({
                  category: 'Social links',
                  action: gaAction,
                });
              }}
            >
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
