/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PetsWrapper from "../../components/pets-wrapper";
import { getPets } from "../../services/api";
import Loading from "../../components/loading";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/slices/app/appSlice";
import SearchMain from "../../components/search/search-main";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import FlipCard from "../../components/flip-card";
import SectionWrapper from "./section-wrapper";
import AccordionItem from "./accordion-item";
import { Link } from "react-router-dom";
import Banner from "../../components/banner";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";

const faqs = [
  {
    title: "Как мога да намеря подходящ домашен любимец?",
    text: "Търсенето на нов домашен любимец е лесно! Използвай нашия удобен търсач и филтрирай животните според твоите предпочитания – вид, възраст, и много други. След като се регистираш и попълниш формата за осиновител, ние ще ти предложим най-подходящите за теб животни.",
  },
  {
    title: "Как мога да взема ново животно у дома?",
    text: " За да се сдобиеш с нов приятел на четири крака, създай акаунт в ДайЛапа и попълни заявка за осиновяване. Очаквай одобрение и скоро ще имаш нов спътник у дома.",
  },
  {
    title:
      "Имам домашен любимец, който си търси нов дом. Как можете да ми помогнете?",
    text: " Ние можем да ви помогнем, като включим вашето животно в нашия списък с животни за осиновяване. Необоходимо е да се регистирарте в през формата за регистрация и да добавите нов домашен любимец.",
  },
  {
    title: "Какви грижи и внимание се нуждаят новите ми приятели?",
    text: "Твоите нови приятели имат нужда от много любов и грижи. Преди да ги приемеш у дома, научи повече за техните нужди и как да ги поддържаш щастливи – хранене, разходки и ветеринарни грижи.",
  },
];

const categories = [
  {
    image:
      "https://t4.ftcdn.net/jpg/04/75/62/59/360_F_475625971_HTK8MdH194iKiPdBGVHUxPJWNgDHJZEQ.jpg",
    title: "Кучета",
    subtitle: "Виж всички кучета в ДайЛапа",
    link: "/search?type=dog",
  },
  {
    image:
      "https://images.unsplash.com/photo-1611267254323-4db7b39c732c?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3V0ZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Котки",
    subtitle: "Виж всички котки в ДайЛапа",
    link: "/search?type=cat",
  },
  {
    image:
      "https://www.thesprucepets.com/thmb/r23RBk0t4DC9UHp2pTzuXLz7Jj4=/3600x0/filters:no_upscale():strip_icc()/popular-small-bird-species-390926-hero-d3d0af7bb6ed4947b0c3c5afb4784456.jpg",
    title: "Птици",
    subtitle: "Виж всички птици в ДайЛапа",
    link: "/search?type=bird",
  },
  {
    image: "https://www.cdc.gov/healthypets/images/pets/hedgehog.jpg?_=88696",
    title: "Други",
    subtitle: "Виж всички други животни в ДайЛапа",
    link: "/search?type=other",
  },
  {
    image:
      "https://www.purelypetsinsurance.co.uk/media/s3wgp0n0/dog-and-kitten-meeting.jpg",
    title: "Всички",
    subtitle: "Виж всички животни в ДайЛапа",
    link: "/search",
  },
];

const process = [
  {
    icon: (
      <HowToRegOutlinedIcon
        sx={{ mb: 5, width: 40, height: 40 }}
        color="secondary"
      />
    ),
    title: "Регистрирай се в ДайЛапа",
    subtitle: "Открий иделания домашен любимец за теб",
  },
  {
    icon: (
      <AssignmentTurnedInOutlinedIcon
        sx={{ mb: 5, width: 40, height: 40 }}
        color="secondary"
      />
    ),
    title: "Попълни преференциите си",
    subtitle: "Открий иделания домашен любимец за теб",
  },
  {
    icon: (
      <PetsOutlinedIcon
        sx={{ mb: 5, width: 40, height: 40 }}
        color="secondary"
      />
    ),
    title: "Виж специални предложения за теб",
    subtitle: "Открий иделания домашен любимец за теб",
  },
];

function Home() {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const fetchPets = async () => {
    try {
      // add limit - 7
      const petData = await getPets();
      setPets(petData);
    } catch (error) {
      console.error("Error fetching pets:", error);
      dispatch(
        setAlert({
          severity: "error",
          message: `Грешка при зареждане на всички животни`,
        })
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <SearchMain />
      <SectionWrapper h6="дай лапа" h3="Домашни любимци за теб" h4="">
        <PetsWrapper pets={pets} withAd />
      </SectionWrapper>
      <SectionWrapper
        h6="искаш да осиновиш?"
        h3="Разбери колко лесно е да се сдобиеш с домашен любимец"
      >
        <Container maxWidth="xl" sx={{ my: 8 }}>
          <Grid container gap={2} width="auto" justifyContent="center">
            {process.map((p) => {
              return (
                <Grid item md={3} sm={12} key={p.icon}>
                  <Card
                    sx={{
                      p: 3,
                      height: 250,
                      border: "1px solid",
                      borderColor: "#ececec",
                      borderRadius: 3,
                      boxShadow: "none",
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      {p.icon}
                      <div>
                        <Typography
                          variant="h5"
                          component="div"
                          color="primary.main"
                          sx={{ mb: 1 }}
                        >
                          {p.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="neutral.contrastText"
                        >
                          {p.subtitle}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </SectionWrapper>
      <Container maxWidth="xl">
        <Banner image="https://images.unsplash.com/photo-1551779891-b83901e1f8b3?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </Container>
      <Container maxWidth="lg">
        <SectionWrapper left h6="избери категория" h3="Разгледай ДайЛапа">
          <Grid container gap={2}>
            {categories.map((c) => {
              return (
                <Grid item md={2} sm={6}>
                  <Link to={c.link}>
                    <FlipCard
                      title={c.title}
                      subtitle={c.subtitle}
                      image={c.image}
                    />
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </SectionWrapper>
      </Container>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item md={6} sm={12}>
            <SectionWrapper left h6="FAQ" h3="Често задавни въпроси">
              <Typography variant="h6" color="neutral.contrastText">
                Ако не намираш отгворите на въпросите си тук, можеш да ни пишеш
                на info@giveapaw.com
              </Typography>
            </SectionWrapper>
          </Grid>
          <Grid item md={6} sm={12} sx={{ my: 8, px: 2 }}>
            {faqs.map((f, i) => (
              <AccordionItem index={i} title={f.title} text={f.text} />
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
