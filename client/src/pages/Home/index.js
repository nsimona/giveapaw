/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PetsWrapper from "../../components/pets-wrapper";
import { getPets } from "../../services/api";
import Loading from "../../components/loading";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/slices/app/appSlice";
import SearchMain from "../../components/search/search-main";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import FlipCard from "../../components/flip-card";
import SectionWrapper from "./section-wrapper";
import AccordionItem from "./accordion-item";
import { Link } from "react-router-dom";
import Banner from "../../components/banner";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import arrowShape from "../../assets/images/arrowShape.png";
import catCategory from "../../assets/images/cat-cat.png";
import dogCategory from "../../assets/images/dog-cat.jpg";
import otherCategory from "../../assets/images/other-cat.jpg";
import birdCategory from "../../assets/images/bird-cat.png";
import allCategory from "../../assets/images/all-cat.jpg";

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
    image: dogCategory,
    title: "Кучета",
    subtitle: "Виж всички кучета в ДайЛапа",
    link: "/search?type=dog",
  },
  {
    image: catCategory,
    title: "Котки",
    subtitle: "Виж всички котки в ДайЛапа",
    link: "/search?type=cat",
  },
  {
    image: birdCategory,
    title: "Птици",
    subtitle: "Виж всички птици в ДайЛапа",
    link: "/search?type=bird",
  },
  {
    image: otherCategory,
    title: "Други",
    subtitle: "Виж всички други животни в ДайЛапа",
    link: "/search?type=other",
  },
  {
    image: allCategory,
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

const ownerProcess = [
  { title: "Регистирай се и добави нов домашен любимец" },
  { title: "Обявата ти трябва да бъде одобрена от администратор" },
  { title: "Обявата ти ще бъде показана първо на подходящи осиновители" },
  { title: "Ще получиш информация за кандидатите в твоя профил" },
  { title: "Разгледай всички кандидати в профила си" },
];

function Home() {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const fetchPets = async () => {
    try {
      // add limit - 7
      const petData = await getPets({ limit: 9 });
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
      <Container maxWidth="xl" sx={{ my: 1 }}>
        <Banner />
      </Container>

      <Container maxWidth="lg">
        <SectionWrapper
          left
          h6="публикуване на обява"
          h3="Лесно и бързо намери нов дом на твоя домашен любимец"
        ></SectionWrapper>
      </Container>
      <Box
        sx={{
          backgroundImage: `url(${arrowShape})`,
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          p: 3,
        }}
      >
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" gap={1}>
            {ownerProcess.map((p, i) => {
              return (
                <Grid key={i} item md={2} sm={12}>
                  <Box
                    sx={{
                      flexGrow: 1,
                      borderRadius: "50%",
                      width: 210,
                      height: 210,
                      backgroundColor: "neutral.grey",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h3" color="primary.dark">
                      <strong>{i + 1}</strong>
                    </Typography>
                    <p color="neutral.text" style={{ padding: "8px" }}>
                      {p.title}
                    </p>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
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
