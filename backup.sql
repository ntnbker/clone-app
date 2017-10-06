--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: access_contacts; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE access_contacts (
    id integer NOT NULL,
    relation character varying,
    name character varying,
    email character varying,
    mobile character varying,
    maintenance_request_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE access_contacts OWNER TO "Ron";

--
-- Name: access_contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE access_contacts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE access_contacts_id_seq OWNER TO "Ron";

--
-- Name: access_contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE access_contacts_id_seq OWNED BY access_contacts.id;


--
-- Name: action_statuses; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE action_statuses (
    id integer NOT NULL,
    maintenance_request_id integer,
    agent_id integer,
    agency_admin_id integer,
    landlord_id integer,
    tenant_id integer,
    trady_id integer,
    maintenance_request_status text,
    agent_last_action text,
    agent_status text,
    landlord_last_action text,
    landlord_status text,
    trady_last_action text,
    trady_status text,
    tenant_last_action text,
    tenant_status text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    action_category character varying
);


ALTER TABLE action_statuses OWNER TO "Ron";

--
-- Name: action_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE action_statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE action_statuses_id_seq OWNER TO "Ron";

--
-- Name: action_statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE action_statuses_id_seq OWNED BY action_statuses.id;


--
-- Name: agencies; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE agencies (
    id integer NOT NULL,
    company_name character varying,
    business_name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    abn character varying,
    address character varying,
    mailing_address character varying,
    phone character varying,
    mobile_phone character varying,
    license_number character varying,
    bdm_verification_status boolean,
    bdm_verification_id character varying,
    mailing_same_address boolean,
    corporation_license_number character varying,
    license_type character varying
);


ALTER TABLE agencies OWNER TO "Ron";

--
-- Name: agencies_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE agencies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE agencies_id_seq OWNER TO "Ron";

--
-- Name: agencies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE agencies_id_seq OWNED BY agencies.id;


--
-- Name: agency_admins; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE agency_admins (
    id integer NOT NULL,
    email character varying,
    first_name character varying,
    last_name character varying,
    user_id integer,
    mobile_phone character varying,
    agency_id integer,
    license_number character varying
);


ALTER TABLE agency_admins OWNER TO "Ron";

--
-- Name: agency_admins_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE agency_admins_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE agency_admins_id_seq OWNER TO "Ron";

--
-- Name: agency_admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE agency_admins_id_seq OWNED BY agency_admins.id;


--
-- Name: agency_tradie_companies; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE agency_tradie_companies (
    id integer NOT NULL,
    agency_id integer,
    tradie_company_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE agency_tradie_companies OWNER TO "Ron";

--
-- Name: agency_tradie_companies_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE agency_tradie_companies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE agency_tradie_companies_id_seq OWNER TO "Ron";

--
-- Name: agency_tradie_companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE agency_tradie_companies_id_seq OWNED BY agency_tradie_companies.id;


--
-- Name: agency_tradies; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE agency_tradies (
    id integer NOT NULL,
    agency_id integer,
    tradie_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    trady_id integer
);


ALTER TABLE agency_tradies OWNER TO "Ron";

--
-- Name: agency_tradies_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE agency_tradies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE agency_tradies_id_seq OWNER TO "Ron";

--
-- Name: agency_tradies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE agency_tradies_id_seq OWNED BY agency_tradies.id;


--
-- Name: agents; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE agents (
    id integer NOT NULL,
    last_name character varying,
    email character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying,
    mobile_phone character varying,
    license_type character varying,
    license_number character varying,
    agency_id integer,
    user_id integer
);


ALTER TABLE agents OWNER TO "Ron";

--
-- Name: agents_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE agents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE agents_id_seq OWNER TO "Ron";

--
-- Name: agents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE agents_id_seq OWNED BY agents.id;


--
-- Name: ahoy_messages; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE ahoy_messages (
    id integer NOT NULL,
    token character varying,
    "to" text,
    user_id integer,
    user_type character varying,
    mailer character varying,
    subject text,
    sent_at timestamp without time zone,
    opened_at timestamp without time zone,
    clicked_at timestamp without time zone,
    maintenance_request_id integer
);


ALTER TABLE ahoy_messages OWNER TO "Ron";

--
-- Name: ahoy_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE ahoy_messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ahoy_messages_id_seq OWNER TO "Ron";

--
-- Name: ahoy_messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE ahoy_messages_id_seq OWNED BY ahoy_messages.id;


--
-- Name: appointments; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE appointments (
    id integer NOT NULL,
    trady_id integer,
    tenant_id integer,
    maintenance_request_id integer,
    date date,
    "time" time without time zone,
    status character varying,
    comment text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    landlord_id integer,
    current_user_role character varying,
    appointment_type character varying
);


ALTER TABLE appointments OWNER TO "Ron";

--
-- Name: appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE appointments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE appointments_id_seq OWNER TO "Ron";

--
-- Name: appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE appointments_id_seq OWNED BY appointments.id;


--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE ar_internal_metadata OWNER TO "Ron";

--
-- Name: availabilities; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE availabilities (
    id integer NOT NULL,
    maintenance_request_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    available_only_by_appointment boolean,
    date date,
    start_time time without time zone,
    finish_time time without time zone
);


ALTER TABLE availabilities OWNER TO "Ron";

--
-- Name: availabilities_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE availabilities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE availabilities_id_seq OWNER TO "Ron";

--
-- Name: availabilities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE availabilities_id_seq OWNED BY availabilities.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE comments (
    id integer NOT NULL,
    trady_id integer,
    tenant_id integer,
    appointment_id integer,
    body text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    landlord_id integer
);


ALTER TABLE comments OWNER TO "Ron";

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comments_id_seq OWNER TO "Ron";

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE comments_id_seq OWNED BY comments.id;


--
-- Name: conversations; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE conversations (
    id integer NOT NULL,
    sender_id integer,
    recipient_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    conversation_type character varying,
    maintenance_request_id integer,
    quote_id integer
);


ALTER TABLE conversations OWNER TO "Ron";

--
-- Name: conversations_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE conversations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE conversations_id_seq OWNER TO "Ron";

--
-- Name: conversations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE conversations_id_seq OWNED BY conversations.id;


--
-- Name: current_roles; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE current_roles (
    id integer NOT NULL,
    user_id integer,
    role character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE current_roles OWNER TO "Ron";

--
-- Name: current_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE current_roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE current_roles_id_seq OWNER TO "Ron";

--
-- Name: current_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE current_roles_id_seq OWNED BY current_roles.id;


--
-- Name: gods; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE gods (
    id integer NOT NULL,
    full_name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id integer
);


ALTER TABLE gods OWNER TO "Ron";

--
-- Name: gods_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE gods_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE gods_id_seq OWNER TO "Ron";

--
-- Name: gods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE gods_id_seq OWNED BY gods.id;


--
-- Name: guests; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE guests (
    id integer NOT NULL,
    user_id integer
);


ALTER TABLE guests OWNER TO "Ron";

--
-- Name: guests_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE guests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE guests_id_seq OWNER TO "Ron";

--
-- Name: guests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE guests_id_seq OWNED BY guests.id;


--
-- Name: images; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE images (
    id integer NOT NULL,
    maintenance_request_id integer,
    image_data text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE images OWNER TO "Ron";

--
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE images_id_seq OWNER TO "Ron";

--
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE images_id_seq OWNED BY images.id;


--
-- Name: instructions; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE instructions (
    id integer NOT NULL,
    read_instruction boolean,
    user_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE instructions OWNER TO "Ron";

--
-- Name: instructions_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE instructions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE instructions_id_seq OWNER TO "Ron";

--
-- Name: instructions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE instructions_id_seq OWNED BY instructions.id;


--
-- Name: invoice_items; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE invoice_items (
    id integer NOT NULL,
    invoice_id integer,
    item_description text,
    amount double precision,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    pricing_type character varying,
    hours double precision,
    total_per_hour double precision
);


ALTER TABLE invoice_items OWNER TO "Ron";

--
-- Name: invoice_items_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE invoice_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE invoice_items_id_seq OWNER TO "Ron";

--
-- Name: invoice_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE invoice_items_id_seq OWNED BY invoice_items.id;


--
-- Name: invoice_payments; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE invoice_payments (
    id integer NOT NULL,
    invoice_id integer,
    payment_status character varying,
    amount_paid integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    date date
);


ALTER TABLE invoice_payments OWNER TO "Ron";

--
-- Name: invoice_payments_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE invoice_payments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE invoice_payments_id_seq OWNER TO "Ron";

--
-- Name: invoice_payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE invoice_payments_id_seq OWNED BY invoice_payments.id;


--
-- Name: invoices; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE invoices (
    id integer NOT NULL,
    trady_id integer,
    maintenance_request_id integer,
    amount double precision,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    tax boolean,
    ledger_id integer,
    gst_amount double precision,
    due_date date,
    delivery_status boolean,
    print_status boolean,
    invoice_number character varying,
    trady_invoice_reference text,
    paid boolean DEFAULT false
);


ALTER TABLE invoices OWNER TO "Ron";

--
-- Name: invoices_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE invoices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE invoices_id_seq OWNER TO "Ron";

--
-- Name: invoices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE invoices_id_seq OWNED BY invoices.id;


--
-- Name: landlords; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE landlords (
    id integer NOT NULL,
    name character varying,
    email character varying,
    mobile character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id integer
);


ALTER TABLE landlords OWNER TO "Ron";

--
-- Name: landlords_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE landlords_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE landlords_id_seq OWNER TO "Ron";

--
-- Name: landlords_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE landlords_id_seq OWNED BY landlords.id;


--
-- Name: ledgers; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE ledgers (
    id integer NOT NULL,
    grand_total double precision,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    maintenance_request_id integer,
    super_ledger_id integer
);


ALTER TABLE ledgers OWNER TO "Ron";

--
-- Name: ledgers_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE ledgers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ledgers_id_seq OWNER TO "Ron";

--
-- Name: ledgers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE ledgers_id_seq OWNED BY ledgers.id;


--
-- Name: logs; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE logs (
    id integer NOT NULL,
    maintenance_request_id integer,
    action character varying,
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE logs OWNER TO "Ron";

--
-- Name: logs_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE logs_id_seq OWNER TO "Ron";

--
-- Name: logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE logs_id_seq OWNED BY logs.id;


--
-- Name: main_users; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE main_users (
    id integer NOT NULL,
    main_user_type character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    god_id integer
);


ALTER TABLE main_users OWNER TO "Ron";

--
-- Name: main_users_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE main_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE main_users_id_seq OWNER TO "Ron";

--
-- Name: main_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE main_users_id_seq OWNED BY main_users.id;


--
-- Name: maintenance_request_images; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE maintenance_request_images (
    id integer NOT NULL,
    images character varying[] DEFAULT '{}'::character varying[],
    maintenance_request_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    image_data text
);


ALTER TABLE maintenance_request_images OWNER TO "Ron";

--
-- Name: maintenance_request_images_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE maintenance_request_images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE maintenance_request_images_id_seq OWNER TO "Ron";

--
-- Name: maintenance_request_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE maintenance_request_images_id_seq OWNED BY maintenance_request_images.id;


--
-- Name: maintenance_requests; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE maintenance_requests (
    id integer NOT NULL,
    name character varying,
    email character varying,
    mobile character varying,
    access_contact text,
    maintenance_heading character varying,
    maintenance_description text,
    image integer,
    availability text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    agent_id integer,
    tenant_id integer,
    person_in_charge character varying,
    real_estate_office character varying,
    agent_name character varying,
    agent_email character varying,
    agent_mobile character varying,
    service_type character varying,
    property_id integer,
    agency_id integer,
    agency_admin_id integer,
    trady_id integer,
    availability_and_access text,
    work_order_number character varying
);


ALTER TABLE maintenance_requests OWNER TO "Ron";

--
-- Name: maintenance_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE maintenance_requests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE maintenance_requests_id_seq OWNER TO "Ron";

--
-- Name: maintenance_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE maintenance_requests_id_seq OWNED BY maintenance_requests.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE messages (
    id integer NOT NULL,
    user_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    body text,
    conversation_id integer,
    role character varying
);


ALTER TABLE messages OWNER TO "Ron";

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE messages_id_seq OWNER TO "Ron";

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE messages_id_seq OWNED BY messages.id;


--
-- Name: properties; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE properties (
    id integer NOT NULL,
    agency_admin_id integer,
    landlord_id integer,
    property_address character varying,
    agency_id integer
);


ALTER TABLE properties OWNER TO "Ron";

--
-- Name: properties_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE properties_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE properties_id_seq OWNER TO "Ron";

--
-- Name: properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE properties_id_seq OWNED BY properties.id;


--
-- Name: queries; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE queries (
    id integer NOT NULL,
    maintenance_request_id integer,
    user_role character varying,
    tradie character varying,
    address character varying
);


ALTER TABLE queries OWNER TO "Ron";

--
-- Name: queries_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE queries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE queries_id_seq OWNER TO "Ron";

--
-- Name: queries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE queries_id_seq OWNED BY queries.id;


--
-- Name: quote_items; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE quote_items (
    id integer NOT NULL,
    quote_id integer,
    item_description character varying,
    amount double precision,
    pricing_type character varying,
    hours double precision,
    total_per_hour double precision
);


ALTER TABLE quote_items OWNER TO "Ron";

--
-- Name: quote_items_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE quote_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE quote_items_id_seq OWNER TO "Ron";

--
-- Name: quote_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE quote_items_id_seq OWNED BY quote_items.id;


--
-- Name: quote_requests; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE quote_requests (
    id integer NOT NULL,
    maintenance_request_id integer,
    trady_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    quote_id integer
);


ALTER TABLE quote_requests OWNER TO "Ron";

--
-- Name: quote_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE quote_requests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE quote_requests_id_seq OWNER TO "Ron";

--
-- Name: quote_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE quote_requests_id_seq OWNED BY quote_requests.id;


--
-- Name: quotes; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE quotes (
    id integer NOT NULL,
    amount double precision,
    maintenance_request_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    trady_id integer,
    status character varying,
    delivery_status boolean,
    tax boolean,
    gst_amount double precision,
    forwarded_to_landlord boolean,
    quote_number character varying,
    trady_quote_reference text
);


ALTER TABLE quotes OWNER TO "Ron";

--
-- Name: quotes_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE quotes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE quotes_id_seq OWNER TO "Ron";

--
-- Name: quotes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE quotes_id_seq OWNED BY quotes.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE roles (
    id integer NOT NULL,
    user_id integer,
    roleable_type character varying,
    roleable_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE roles OWNER TO "Ron";

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE roles_id_seq OWNER TO "Ron";

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE roles_id_seq OWNED BY roles.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE schema_migrations (
    version character varying NOT NULL
);


ALTER TABLE schema_migrations OWNER TO "Ron";

--
-- Name: service_needs; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE service_needs (
    id integer NOT NULL
);


ALTER TABLE service_needs OWNER TO "Ron";

--
-- Name: service_needs_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE service_needs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE service_needs_id_seq OWNER TO "Ron";

--
-- Name: service_needs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE service_needs_id_seq OWNED BY service_needs.id;


--
-- Name: services; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE services (
    id integer NOT NULL,
    service character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    god_id integer
);


ALTER TABLE services OWNER TO "Ron";

--
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE services_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE services_id_seq OWNER TO "Ron";

--
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE services_id_seq OWNED BY services.id;


--
-- Name: skills; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE skills (
    id integer NOT NULL,
    skill character varying,
    trady_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE skills OWNER TO "Ron";

--
-- Name: skills_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE skills_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE skills_id_seq OWNER TO "Ron";

--
-- Name: skills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE skills_id_seq OWNED BY skills.id;


--
-- Name: super_ledgers; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE super_ledgers (
    id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    maintenance_request_id integer,
    ledger_id integer,
    grand_total double precision
);


ALTER TABLE super_ledgers OWNER TO "Ron";

--
-- Name: super_ledgers_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE super_ledgers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE super_ledgers_id_seq OWNER TO "Ron";

--
-- Name: super_ledgers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE super_ledgers_id_seq OWNED BY super_ledgers.id;


--
-- Name: tenant_maintenance_requests; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE tenant_maintenance_requests (
    id integer NOT NULL,
    tenant_id integer,
    maintenance_request_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE tenant_maintenance_requests OWNER TO "Ron";

--
-- Name: tenant_maintenance_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE tenant_maintenance_requests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tenant_maintenance_requests_id_seq OWNER TO "Ron";

--
-- Name: tenant_maintenance_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE tenant_maintenance_requests_id_seq OWNED BY tenant_maintenance_requests.id;


--
-- Name: tenants; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE tenants (
    id integer NOT NULL,
    full_name character varying,
    email character varying,
    mobile character varying,
    property_id integer,
    user_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying
);


ALTER TABLE tenants OWNER TO "Ron";

--
-- Name: tenants_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE tenants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tenants_id_seq OWNER TO "Ron";

--
-- Name: tenants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE tenants_id_seq OWNED BY tenants.id;


--
-- Name: tradies; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE tradies (
    id integer NOT NULL,
    name character varying,
    mobile character varying,
    email character varying,
    user_id integer,
    skill character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    trady_company_id integer,
    company_name character varying
);


ALTER TABLE tradies OWNER TO "Ron";

--
-- Name: tradies_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE tradies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tradies_id_seq OWNER TO "Ron";

--
-- Name: tradies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE tradies_id_seq OWNED BY tradies.id;


--
-- Name: trady_companies; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE trady_companies (
    id integer NOT NULL,
    company_name character varying,
    trading_name character varying,
    abn character varying,
    gst_registration boolean,
    address character varying,
    mailing_address_same boolean,
    mailing_address character varying,
    mobile_number character varying,
    email character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    account_name character varying,
    bsb_number character varying,
    bank_account_number character varying,
    trady_id integer
);


ALTER TABLE trady_companies OWNER TO "Ron";

--
-- Name: trady_companies_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE trady_companies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE trady_companies_id_seq OWNER TO "Ron";

--
-- Name: trady_companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE trady_companies_id_seq OWNED BY trady_companies.id;


--
-- Name: trady_statuses; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE trady_statuses (
    id integer NOT NULL,
    maintenance_request_id integer,
    status character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE trady_statuses OWNER TO "Ron";

--
-- Name: trady_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE trady_statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE trady_statuses_id_seq OWNER TO "Ron";

--
-- Name: trady_statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE trady_statuses_id_seq OWNED BY trady_statuses.id;


--
-- Name: uploaded_invoices; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE uploaded_invoices (
    id integer NOT NULL,
    invoices character varying[] DEFAULT '{}'::character varying[],
    maintenance_request_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    trady_id integer,
    delivery_status boolean,
    invoice_data text,
    pdf_data text,
    url text
);


ALTER TABLE uploaded_invoices OWNER TO "Ron";

--
-- Name: uploaded_invoices_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE uploaded_invoices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE uploaded_invoices_id_seq OWNER TO "Ron";

--
-- Name: uploaded_invoices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE uploaded_invoices_id_seq OWNED BY uploaded_invoices.id;


--
-- Name: uploaded_quotes; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE uploaded_quotes (
    id integer NOT NULL,
    quotes character varying[] DEFAULT '{}'::character varying[],
    maintenance_request_id integer,
    delivery_status boolean,
    trady_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    status character varying
);


ALTER TABLE uploaded_quotes OWNER TO "Ron";

--
-- Name: uploaded_quotes_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE uploaded_quotes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE uploaded_quotes_id_seq OWNER TO "Ron";

--
-- Name: uploaded_quotes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE uploaded_quotes_id_seq OWNED BY uploaded_quotes.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE urls (
    id integer NOT NULL,
    short_url text,
    original_url text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE urls OWNER TO "Ron";

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE urls_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE urls_id_seq OWNER TO "Ron";

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE urls_id_seq OWNED BY urls.id;


--
-- Name: user_conversations; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE user_conversations (
    id integer NOT NULL,
    user_id integer,
    conversation_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE user_conversations OWNER TO "Ron";

--
-- Name: user_conversations_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE user_conversations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_conversations_id_seq OWNER TO "Ron";

--
-- Name: user_conversations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE user_conversations_id_seq OWNED BY user_conversations.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: Ron
--

CREATE TABLE users (
    id integer NOT NULL,
    email character varying NOT NULL,
    crypted_password character varying,
    salt character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    reset_password_token character varying,
    reset_password_token_expires_at timestamp without time zone,
    reset_password_email_sent_at timestamp without time zone,
    set_password_token character varying,
    id_token character varying
);


ALTER TABLE users OWNER TO "Ron";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: Ron
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO "Ron";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Ron
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY access_contacts ALTER COLUMN id SET DEFAULT nextval('access_contacts_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY action_statuses ALTER COLUMN id SET DEFAULT nextval('action_statuses_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY agencies ALTER COLUMN id SET DEFAULT nextval('agencies_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY agency_admins ALTER COLUMN id SET DEFAULT nextval('agency_admins_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY agency_tradie_companies ALTER COLUMN id SET DEFAULT nextval('agency_tradie_companies_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY agency_tradies ALTER COLUMN id SET DEFAULT nextval('agency_tradies_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY agents ALTER COLUMN id SET DEFAULT nextval('agents_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY ahoy_messages ALTER COLUMN id SET DEFAULT nextval('ahoy_messages_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY appointments ALTER COLUMN id SET DEFAULT nextval('appointments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY availabilities ALTER COLUMN id SET DEFAULT nextval('availabilities_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY comments ALTER COLUMN id SET DEFAULT nextval('comments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY conversations ALTER COLUMN id SET DEFAULT nextval('conversations_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY current_roles ALTER COLUMN id SET DEFAULT nextval('current_roles_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY gods ALTER COLUMN id SET DEFAULT nextval('gods_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY guests ALTER COLUMN id SET DEFAULT nextval('guests_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY images ALTER COLUMN id SET DEFAULT nextval('images_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY instructions ALTER COLUMN id SET DEFAULT nextval('instructions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY invoice_items ALTER COLUMN id SET DEFAULT nextval('invoice_items_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY invoice_payments ALTER COLUMN id SET DEFAULT nextval('invoice_payments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY invoices ALTER COLUMN id SET DEFAULT nextval('invoices_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY landlords ALTER COLUMN id SET DEFAULT nextval('landlords_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY ledgers ALTER COLUMN id SET DEFAULT nextval('ledgers_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY logs ALTER COLUMN id SET DEFAULT nextval('logs_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY main_users ALTER COLUMN id SET DEFAULT nextval('main_users_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY maintenance_request_images ALTER COLUMN id SET DEFAULT nextval('maintenance_request_images_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY maintenance_requests ALTER COLUMN id SET DEFAULT nextval('maintenance_requests_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY messages ALTER COLUMN id SET DEFAULT nextval('messages_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY properties ALTER COLUMN id SET DEFAULT nextval('properties_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY queries ALTER COLUMN id SET DEFAULT nextval('queries_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY quote_items ALTER COLUMN id SET DEFAULT nextval('quote_items_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY quote_requests ALTER COLUMN id SET DEFAULT nextval('quote_requests_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY quotes ALTER COLUMN id SET DEFAULT nextval('quotes_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY roles ALTER COLUMN id SET DEFAULT nextval('roles_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY service_needs ALTER COLUMN id SET DEFAULT nextval('service_needs_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY services ALTER COLUMN id SET DEFAULT nextval('services_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY skills ALTER COLUMN id SET DEFAULT nextval('skills_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY super_ledgers ALTER COLUMN id SET DEFAULT nextval('super_ledgers_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY tenant_maintenance_requests ALTER COLUMN id SET DEFAULT nextval('tenant_maintenance_requests_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY tenants ALTER COLUMN id SET DEFAULT nextval('tenants_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY tradies ALTER COLUMN id SET DEFAULT nextval('tradies_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY trady_companies ALTER COLUMN id SET DEFAULT nextval('trady_companies_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY trady_statuses ALTER COLUMN id SET DEFAULT nextval('trady_statuses_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY uploaded_invoices ALTER COLUMN id SET DEFAULT nextval('uploaded_invoices_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY uploaded_quotes ALTER COLUMN id SET DEFAULT nextval('uploaded_quotes_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY urls ALTER COLUMN id SET DEFAULT nextval('urls_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY user_conversations ALTER COLUMN id SET DEFAULT nextval('user_conversations_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: access_contacts; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY access_contacts (id, relation, name, email, mobile, maintenance_request_id, created_at, updated_at) FROM stdin;
1	Tenant	bobby	bob@email.com	1827634981	8	2017-06-28 09:19:45.070652	2017-06-28 09:19:45.070652
2	Tenant	bobby	bob@email.com	1293461283	9	2017-06-28 09:31:39.698535	2017-06-28 09:31:39.698535
3	Tenant	staline	stalin@email.com	9832475987	58	2017-07-16 12:11:45.272223	2017-07-16 12:11:45.272223
4	Tenant				75	2017-07-31 20:59:24.469192	2017-07-31 20:59:24.469192
\.


--
-- Name: access_contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('access_contacts_id_seq', 4, true);


--
-- Data for Name: action_statuses; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY action_statuses (id, maintenance_request_id, agent_id, agency_admin_id, landlord_id, tenant_id, trady_id, maintenance_request_status, agent_last_action, agent_status, landlord_last_action, landlord_status, trady_last_action, trady_status, tenant_last_action, tenant_status, created_at, updated_at, action_category) FROM stdin;
2	2	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-06-28 05:27:11.129417	2017-06-28 05:27:11.129417	Action Required
3	3	\N	\N	\N	\N	\N	New	\N	Awaiting Tradie Initiation	\N	\N	\N	\N	\N	\N	2017-06-28 05:51:57.371825	2017-06-28 05:52:43.557436	Action Required
23	23	\N	\N	\N	\N	\N	In Progress	\N	Tenant To Confirm Appointment	\N	\N	\N	Awaiting Appointment Confirmation	\N	\N	2017-06-29 05:01:38.753549	2017-06-29 12:48:31.588896	Awaiting Action
4	4	\N	\N	\N	\N	\N	In Progress	\N	Awaiting Owner Initiation	\N	\N	\N	\N	\N	\N	2017-06-28 05:58:59.781396	2017-06-28 05:59:32.241086	Awaiting Action
5	5	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-06-28 07:43:42.871106	2017-06-28 07:43:42.871106	Action Required
6	6	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-06-28 07:53:31.413837	2017-06-28 07:53:31.413837	Action Required
7	7	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-06-28 08:49:03.009131	2017-06-28 08:49:03.009131	Action Required
8	8	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-06-28 09:19:45.099411	2017-06-28 09:19:45.099411	Action Required
29	29	\N	\N	\N	\N	\N	New	\N	Tenant To Confirm Appointment	\N	\N	\N	Awaiting Appointment Confirmation	\N	\N	2017-07-06 10:24:17.299833	2017-07-07 07:38:04.473278	Action Required
9	9	\N	\N	\N	\N	\N	New	\N	Tenant To Confirm Appointment	\N	\N	\N	Awaiting Appointment Confirmation	\N	\N	2017-06-28 09:31:39.720865	2017-06-28 11:11:32.835872	Awaiting Action
10	10	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-06-28 14:30:03.387498	2017-06-28 14:30:03.387498	Action Required
11	11	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-06-28 14:50:42.660156	2017-06-28 14:50:42.660156	Action Required
12	12	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-06-28 14:52:47.887681	2017-06-28 14:52:47.887681	Action Required
13	13	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-06-28 14:59:05.22543	2017-06-28 14:59:05.22543	Action Required
14	14	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-06-28 15:01:04.463728	2017-06-28 15:01:04.463728	Action Required
15	15	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-06-28 15:08:01.089248	2017-06-28 15:08:01.089248	Action Required
16	16	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-06-28 15:11:20.097387	2017-06-28 15:11:20.097387	Action Required
17	17	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-06-28 15:13:21.751965	2017-06-28 15:13:21.751965	Action Required
26	26	\N	\N	\N	\N	\N	New	\N	Tenant To Confirm Appointment	\N	\N	\N	\N	\N	\N	2017-06-30 12:41:02.317257	2017-07-03 14:02:28.311849	Action Required
19	19	\N	\N	\N	\N	\N	In Progress	\N	Awaiting Tradie Initiation	\N	\N	\N	\N	\N	\N	2017-06-28 15:43:27.124513	2017-06-28 18:38:47.650907	Awaiting Action
18	18	\N	\N	\N	\N	\N	New	\N	Tenant To Confirm Appointment	\N	\N	\N	Awaiting Appointment Confirmation	\N	\N	2017-06-28 15:17:55.54893	2017-06-28 18:41:12.184771	Action Required
20	20	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-06-29 04:11:51.380137	2017-06-29 04:11:51.380137	Action Required
21	21	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-06-29 04:13:45.753899	2017-06-29 04:13:45.753899	Action Required
30	30	\N	\N	\N	\N	\N	Completed	\N	Job Completed	\N	\N	\N	Awaiting Payment	\N	\N	2017-07-10 09:25:53.950592	2017-07-16 11:44:25.636086	Completed
24	24	\N	\N	\N	\N	\N	In Progress	\N	Awaiting Tradie Initiation	\N	\N	\N	\N	\N	\N	2017-06-29 05:07:05.76697	2017-06-29 05:46:25.452921	Awaiting Action
25	25	\N	\N	\N	\N	\N	New	\N	Quote Approved Tradie To Organise Appointment	\N	\N	\N	Appointment Required	\N	\N	2017-06-29 08:35:47.948448	2017-07-03 16:48:46.353745	Action Required
27	27	\N	\N	\N	\N	\N	New	\N	Quote Received Awaiting Approval	\N	\N	\N	\N	\N	\N	2017-06-30 12:51:41.818317	2017-07-05 07:28:02.595849	Action Required
28	28	\N	\N	\N	\N	\N	In Progress	\N	Awaiting Owner Initiation	\N	\N	\N	Alternate Appointment Requested	\N	\N	2017-07-04 17:00:58.82804	2017-07-05 05:05:50.729451	Awaiting Action
1	1	\N	\N	\N	\N	\N	New	\N	Quote Approved Tradie To Organise Appointment	\N	\N	\N	Appointment Required	\N	\N	2017-06-28 05:24:33.304613	2017-07-05 07:24:01.121229	Awaiting Action
22	22	\N	\N	\N	\N	\N	In Progress	\N	Awaiting Owner Initiation	\N	\N	\N	\N	\N	\N	2017-06-29 04:58:19.429525	2017-06-29 04:58:19.429525	Awaiting Action
31	31	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-11 08:45:53.111909	2017-07-11 08:45:53.111909	Action Required
32	32	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-12 08:43:37.139021	2017-07-12 08:43:37.139021	Action Required
33	33	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-12 08:46:41.988925	2017-07-12 08:46:41.988925	Action Required
34	34	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-12 08:57:11.867917	2017-07-12 08:57:11.867917	Action Required
35	35	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-12 09:02:24.751254	2017-07-12 09:02:24.751254	Action Required
36	36	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-12 09:43:59.770502	2017-07-12 09:43:59.770502	Action Required
37	37	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-12 09:48:16.552954	2017-07-12 09:48:16.552954	Action Required
38	38	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-12 09:51:09.994267	2017-07-12 09:51:09.994267	Action Required
39	39	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-12 09:56:59.538903	2017-07-12 09:56:59.538903	Action Required
40	40	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-12 10:00:33.963793	2017-07-12 10:00:33.963793	Action Required
41	41	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-12 10:28:38.201771	2017-07-12 10:28:38.201771	Action Required
42	42	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-12 10:31:15.619127	2017-07-12 10:31:15.619127	Action Required
43	43	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-12 13:46:17.605619	2017-07-12 13:46:17.605619	Action Required
44	44	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-12 13:49:33.155318	2017-07-12 13:49:33.155318	Action Required
45	45	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-12 14:21:24.65114	2017-07-12 14:21:24.65114	Action Required
46	46	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-12 14:31:09.701867	2017-07-12 14:31:09.701867	Action Required
89	89	\N	\N	\N	\N	\N	New	\N	Quote Approved Tradie To Organise Appointment	\N	\N	\N	Appointment Required	\N	\N	2017-08-18 06:10:38.429466	2017-08-21 03:02:54.008103	Action Required
47	47	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-12 14:37:08.819744	2017-07-12 14:37:08.819744	Action Required
48	48	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-14 07:31:50.906505	2017-07-14 07:31:50.906505	Action Required
49	49	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-14 07:38:21.683704	2017-07-14 07:38:21.683704	Action Required
50	50	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-14 07:40:44.270384	2017-07-14 07:40:44.270384	Action Required
51	51	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-14 07:44:05.537065	2017-07-14 07:44:05.537065	Action Required
52	52	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-14 08:03:57.817662	2017-07-14 08:03:57.817662	Action Required
53	53	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-14 08:07:44.82088	2017-07-14 08:07:44.82088	Action Required
54	54	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-14 08:09:56.960692	2017-07-14 08:09:56.960692	Action Required
55	55	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-14 08:11:21.587276	2017-07-14 08:11:21.587276	Action Required
56	56	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-14 08:12:48.188468	2017-07-14 08:12:48.188468	Action Required
91	91	\N	\N	\N	\N	\N	New	\N	Quote Received	\N	\N	\N	\N	\N	\N	2017-08-22 02:29:30.657113	2017-08-22 02:37:51.134855	Action Required
57	57	\N	\N	\N	\N	\N	New	\N	Awaiting Quote	\N	\N	\N	\N	\N	\N	2017-07-14 10:31:30.495913	2017-07-16 11:46:27.489331	Action Required
58	58	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-16 12:11:45.295651	2017-07-16 12:11:45.295651	Action Required
59	59	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-16 14:15:15.499542	2017-07-16 14:15:15.499542	Action Required
81	81	\N	\N	\N	\N	\N	In Progress	\N	Maintenance Scheduled - Awaiting Invoice	\N	\N	\N	Job Booked	\N	\N	2017-08-08 23:31:50.197178	2017-08-09 00:22:56.02872	Action Required
77	77	\N	\N	\N	\N	\N	New	\N	Awaiting Tradie Initiation	\N	\N	\N	\N	\N	\N	2017-08-07 02:58:26.303889	2017-08-09 02:39:32.970537	Action Required
76	76	\N	\N	\N	\N	\N	New	\N	Awaiting Tradie Initiation	\N	\N	\N	\N	\N	\N	2017-08-07 02:42:05.94907	2017-08-09 06:37:18.904351	Action Required
82	82	\N	\N	\N	\N	\N	New	\N	Defer	\N	\N	\N	\N	\N	\N	2017-08-09 07:10:31.702357	2017-08-09 07:10:31.702357	Action Required
75	75	\N	\N	\N	\N	\N	New	\N	Defer	\N	\N	\N	\N	\N	\N	2017-07-31 20:59:24.501453	2017-07-31 20:59:24.501453	Action Required
60	60	\N	\N	\N	\N	\N	In Progress	\N	Awaiting Owner Initiation	\N	\N	\N	\N	\N	\N	2017-07-16 15:38:27.900327	2017-07-16 15:38:27.900327	Awaiting Action
74	74	\N	\N	\N	\N	\N	New	\N	Awaiting Tradie Initiation	\N	\N	\N	\N	\N	\N	2017-07-31 05:33:57.356713	2017-08-09 07:42:51.779953	Action Required
73	73	\N	\N	\N	\N	\N	New	\N	Archive	\N	\N	\N	\N	\N	\N	2017-07-31 05:29:06.248606	2017-07-31 05:29:06.248606	Action Required
61	61	\N	\N	\N	\N	\N	In Progress	\N	Tenant To Confirm Appointment	\N	\N	\N	Awaiting Appointment Confirmation	\N	\N	2017-07-16 15:39:32.146773	2017-07-19 18:52:36.257241	Awaiting Action
63	63	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-21 02:45:05.297236	2017-07-21 02:45:05.297236	Action Required
62	62	\N	\N	\N	\N	\N	In Progress	\N	Awaiting Tradie Initiation	\N	\N	\N	\N	\N	\N	2017-07-19 16:54:00.718109	2017-07-24 02:55:56.696718	Awaiting Action
83	83	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-08-09 20:33:12.446468	2017-08-09 20:33:12.446468	Action Required
80	80	\N	\N	\N	\N	\N	In Progress	\N	Awaiting Quote	\N	\N	\N	\N	\N	\N	2017-08-08 05:10:08.812187	2017-08-08 07:47:29.003424	Action Required
84	84	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-08-09 20:34:12.488961	2017-08-09 20:34:12.488961	Action Required
79	79	\N	\N	\N	\N	\N	New	\N	Awaiting Quote	\N	\N	\N	\N	\N	\N	2017-08-08 05:00:19.505651	2017-08-08 08:17:12.660042	Action Required
64	64	\N	\N	\N	\N	\N	In Progress	\N	Quote Received	\N	\N	\N	\N	\N	\N	2017-07-25 16:05:12.246529	2017-07-25 16:08:17.257661	Action Required
85	85	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-08-09 21:22:26.491652	2017-08-09 21:22:26.491652	Action Required
86	86	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-08-15 05:08:18.771868	2017-08-15 05:08:18.771868	Action Required
67	67	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-26 00:49:47.396323	2017-07-26 00:49:47.396323	Action Required
68	68	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-26 00:56:32.404512	2017-07-26 00:56:32.404512	Action Required
69	69	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-26 06:05:20.021703	2017-07-26 06:05:20.021703	Action Required
70	70	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-07-27 04:27:44.326093	2017-07-27 04:27:44.326093	Action Required
78	78	\N	\N	\N	\N	\N	In Progress	\N	Awaiting Owner Initiation	\N	\N	\N	\N	\N	\N	2017-08-07 08:20:35.402058	2017-08-07 08:20:35.402058	Awaiting Action
66	66	\N	\N	\N	\N	\N	Completed	\N	Job Completed	\N	\N	\N	Awaiting Payment	\N	\N	2017-07-26 00:34:22.234533	2017-07-26 00:37:11.732037	Completed
92	92	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-08-22 22:38:42.312698	2017-08-22 22:38:42.312698	Action Required
87	87	\N	\N	\N	\N	\N	New	\N	Quote Received	\N	\N	\N	\N	\N	\N	2017-08-16 04:24:12.042265	2017-08-16 05:11:58.636912	Action Required
72	72	\N	\N	\N	\N	\N	New	\N	Awaiting Tradie Initiation	\N	\N	\N	\N	\N	\N	2017-07-31 05:20:01.543703	2017-08-16 07:56:57.341511	Action Required
65	65	\N	\N	\N	\N	\N	In Progress	\N	Quote Received	\N	\N	\N	Alternate Appointment Requested	\N	\N	2017-07-25 20:15:48.696985	2017-07-25 23:20:34.111823	Action Required
93	93	\N	\N	\N	\N	\N	New	\N	Awaiting Tradie Initiation	\N	\N	\N	\N	\N	\N	2017-08-23 02:36:22.506891	2017-08-24 05:34:21.722274	Action Required
71	71	\N	\N	\N	\N	\N	New	\N	Quote Received	\N	\N	\N	Appointment Required	\N	\N	2017-07-28 07:45:41.512938	2017-08-21 07:06:26.578122	Action Required
88	88	\N	\N	\N	\N	\N	New	\N	Quote Received	\N	\N	\N	\N	\N	\N	2017-08-17 17:49:42.965904	2017-08-21 08:58:06.574669	Action Required
90	90	\N	\N	\N	\N	\N	New	\N	Initiate Maintenance Request	\N	\N	\N	\N	\N	\N	2017-08-22 00:55:11.836921	2017-08-22 00:55:11.836921	Action Required
\.


--
-- Name: action_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('action_statuses_id_seq', 93, true);


--
-- Data for Name: agencies; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY agencies (id, company_name, business_name, created_at, updated_at, abn, address, mailing_address, phone, mobile_phone, license_number, bdm_verification_status, bdm_verification_id, mailing_same_address, corporation_license_number, license_type) FROM stdin;
1	Leaders INC	Leaders INC	2017-06-28 04:41:11.066758	2017-06-28 04:41:11.066758	12873461298746	123 gladesville	123 gladesville	1278346981274	21384618273492	18283648172346932	t	1287634987126349124	t	1823746982173468	Individual License
2	rita agency	rita	2017-07-16 16:30:06.359447	2017-07-16 16:30:06.359447	93428593845	rita st	rita st	932845908235	0274385909385	21073948098274	t	9283409182340	t	98217430928143	Individual License
3	amy estate	amy estate	2017-08-09 06:01:29.466457	2017-08-09 06:01:29.466457	23452353453253254	123 amy st	123 amy st	238947509238570	2309487502935	23874598235798	t	2384975093254	t	928347509285	Individual License
\.


--
-- Name: agencies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('agencies_id_seq', 3, true);


--
-- Data for Name: agency_admins; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY agency_admins (id, email, first_name, last_name, user_id, mobile_phone, agency_id, license_number) FROM stdin;
1	martin@maintenanceapp.com.au	martin	valencia	2	+61404881309	1	\N
7	rita@email.com	rita	rita	3	38475029348579	2	\N
8	amy@email.com	amy	amy	21	8374582375698	3	\N
\.


--
-- Name: agency_admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('agency_admins_id_seq', 8, true);


--
-- Data for Name: agency_tradie_companies; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY agency_tradie_companies (id, agency_id, tradie_company_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: agency_tradie_companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('agency_tradie_companies_id_seq', 1, false);


--
-- Data for Name: agency_tradies; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY agency_tradies (id, agency_id, tradie_id, created_at, updated_at, trady_id) FROM stdin;
1	1	\N	2017-06-28 05:26:10.276781	2017-06-28 05:26:10.276781	1
2	1	\N	2017-06-28 05:59:32.261293	2017-06-28 05:59:32.261293	2
3	1	\N	2017-07-16 11:43:45.249749	2017-07-16 11:43:45.249749	3
4	1	\N	2017-08-09 02:39:32.97948	2017-08-09 02:39:32.97948	4
5	1	\N	2017-08-24 05:37:43.560153	2017-08-24 05:37:43.560153	5
\.


--
-- Name: agency_tradies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('agency_tradies_id_seq', 5, true);


--
-- Data for Name: agents; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY agents (id, last_name, email, created_at, updated_at, name, mobile_phone, license_type, license_number, agency_id, user_id) FROM stdin;
1	smith	agent@email.com	2017-06-30 06:09:48.487751	2017-06-30 06:09:48.492048	Agent	123784612874361924	\N	81029847213984294	1	8
2	roma	romina@email.com	2017-07-27 04:25:59.362413	2017-07-27 04:25:59.383058	romina	1234897230498	\N	0239847129847	1	18
\.


--
-- Name: agents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('agents_id_seq', 2, true);


--
-- Data for Name: ahoy_messages; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY ahoy_messages (id, token, "to", user_id, user_type, mailer, subject, sent_at, opened_at, clicked_at, maintenance_request_id) FROM stdin;
25	ZFF89LUWB9skzRisd9N2iuBVI5JjFJQf	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 08:51:47.594211	2017-06-28 08:51:48.315732	\N	7
21	6TNh3aPMwkVW79P9PpCURHDR8UHA0zkl	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 07:55:09.752516	2017-06-28 07:55:10.268591	\N	6
13	BrjwipYzHQhPz1Js6HbJhKIXE27WIlLY	tesla@email.com	5	User	UserMailer#set_password_email	Setup Password	2017-06-28 05:59:32.076723	2017-06-28 05:59:32.861339	\N	\N
2	p9rf7RwR7KigtobOLxMZscNsrwH9N3M5	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 05:24:35.502856	2017-06-28 05:24:36.339526	\N	1
3	gZ1KUPfADHLY6bI9TbDhDHa0r846MRnO	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 05:24:35.805302	2017-06-28 05:24:38.875322	\N	1
1	JzHI55YLG9MziOAMgm4egA8We0d30XzK	rita@email.com	3	User	UserMailer#set_password_email	Setup Password	2017-06-28 05:24:35.043391	2017-06-28 05:24:35.90382	2017-06-28 05:24:46.439474	\N
14	simQrzFstWDB1LHRqGpUHLimFa79V4aS	tesla@email.com	5	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-06-28 05:59:32.29259	2017-06-28 05:59:32.941268	\N	4
4	dJTXZWrb8ckT7ASADKlNMmEFY2JPQGU2	handyman@email.com	4	User	UserMailer#set_password_email	Setup Password	2017-06-28 05:26:10.153931	2017-06-28 05:26:10.711642	\N	\N
24	eBkYE9kZ7WUIkOmH8e4Y4NS6EbTR9su6	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 08:51:47.437749	2017-06-28 08:51:48.104617	2017-06-28 08:54:47.323893	7
6	viTXHGR6HCSFlFwmMMyztbad4Qyspg71	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 05:27:11.598756	2017-06-28 05:27:12.347134	\N	2
7	WcNvKtQHlqKGm0wEf1uIg7Gp7V4YscE3	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 05:27:11.696515	2017-06-28 05:27:12.694806	\N	2
5	bdEJ2QAlXSdyohk5lATQsehKNMcwFsxM	handyman@email.com	4	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-06-28 05:26:10.356109	2017-06-28 05:26:10.904632	2017-06-28 05:28:50.149682	1
16	fpRHMRDSAUIBNZp7jDyWKzI3h3yvykF2	bernard@email.com	6	User	LandlordMailer#send_landlord_maintenance_request	Hi bernard a maintenance request has been made	2017-06-28 06:00:54.373356	2017-06-28 06:00:55.087272	\N	4
8	mTfOpqS5watEfEexfH2eSe83DZleYhuN	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 05:51:58.46709	2017-06-28 05:51:59.438335	\N	3
9	hKhLyM1j4PKydPa1dlmtVVTDyt2Cexfs	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 05:51:58.673	2017-06-28 05:51:59.919888	\N	3
15	PY7OCecWT7li5WqL6rcJBhki6Dk0SBFj	bernard@email.com	6	User	UserMailer#set_password_email	Setup Password	2017-06-28 06:00:54.197732	2017-06-28 06:00:55.037209	2017-06-28 07:12:02.666491	\N
10	8YGcM4USLkVBehCcwRjAorRfBFPjWs0z	handyman@email.com	4	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-06-28 05:52:43.574519	2017-06-28 05:52:44.151434	\N	3
11	4IyS8cr5VD7rNM0hN5jUD6YdbRFK5EU7	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 05:59:00.585097	2017-06-28 05:59:01.43224	\N	4
12	dTOtCCH3B0f4YvwRBqROtGdLPURqPdY5	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 05:59:00.788425	2017-06-28 05:59:03.938281	\N	4
22	AsiLW6vBwAQ2aHkLOT2HC66uY88vX80X	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 07:56:04.177183	2017-06-28 07:56:05.005549	\N	6
17	JBZBr3JMY6KBmsfU3I4Ez9dD6Egy9TTQ	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 07:43:43.873246	2017-06-28 07:43:44.622192	\N	5
18	lhoZ7Wy8SPhS5dGXjLjm1nE81nur0qha	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 07:43:44.077136	2017-06-28 07:43:47.861691	\N	5
27	KQyiI3fHFtuvkxy4s8OtLRl7Lz2wNBsI	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 09:22:51.832116	2017-06-28 09:22:52.848441	\N	8
19	LQWh6ehd5lNnR0rms6nY707qbyCCKtyt	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 07:53:31.503988	2017-06-28 07:53:32.170192	\N	6
23	8HZhDZOA1SXI0UHfk6JWLWBPcXbHomAi	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 07:56:04.343656	2017-06-28 07:56:05.20351	2017-06-28 08:19:03.183703	6
20	nRR0SJ5Mk2X7MsLdAolNfIDgi5Um44CZ	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 07:54:02.799967	2017-06-28 07:54:03.310982	\N	6
26	9ZsmuavzNicF2uSIj7KMVTuM5q9sDNSo	bob@email.com	7	User	UserMailer#set_password_email	Setup Password	2017-06-28 09:19:45.809519	2017-06-28 09:19:46.367606	\N	\N
29	do2FOxCvZhabHcnsrhGOyvF8jULdfKpE	bob@email.com	7	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 09:22:52.133813	2017-06-28 09:22:53.132682	\N	8
28	DbuUOIbrce0OwUpu2ceQEsSaLhTH7dW1	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 09:22:52.003391	2017-06-28 09:22:55.252106	\N	8
33	kuxkhBVzKYiFcerHM8zrueWeYIKsCsDx	handyman@email.com	4	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-06-28 09:44:26.453287	2017-06-28 09:44:26.912925	2017-06-28 09:44:41.014744	9
34	ju7rfW681qP5XcyYALIshodocLkSSzcL	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Hi A quote has been submitted	2017-06-28 10:00:55.504386	2017-06-28 10:00:57.273518	2017-06-28 10:02:06.182817	9
31	YhA8XEBqPxiBe5p5ujxnbwi8MizhOUu5	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 09:31:41.20625	2017-06-28 09:31:42.173136	\N	9
30	ETTe0WIO9pdiCoiSpWs4SaRyeuGTlSZ3	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 09:31:40.958536	2017-06-28 09:31:41.655408	\N	9
32	MmyO2m1UDbkMiFq9gRBsr5Tct8iZEVeX	bob@email.com	7	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 09:31:41.386922	2017-06-28 09:31:42.484215	\N	9
37	1nqPmoTNfop1HNmgFeR8TBNuZdvifN1y	handyman@email.com	4	User	TradyMailer#approved_quote_email	Quote Accepted	2017-06-28 10:34:35.845613	2017-06-28 10:34:36.314906	2017-06-28 10:34:57.978079	9
36	RWdds1ZISCEKgRgM5fyXIu05GJ1zHUtD	handyman@email.com	4	User	UserMailer#reset_password_email	Reset Password	2017-06-28 10:03:43.530125	2017-06-28 10:03:46.283987	\N	\N
35	lYjabre0MJivN1HxCfTmtk9J57HFiwwJ	bernard@email.com	6	User	LandlordMailer#send_landlord_quote	Hi bernard a quote has been send for a maintenance request job	2017-06-28 10:00:56.097355	2017-06-28 10:00:56.65711	2017-06-28 10:37:23.860966	9
68	QQ3JuhwiVkHA087bQk2uuCwCFBP86lWL	handyman@email.com	4	User	TradyMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-06-28 18:47:28.782581	2017-06-28 18:47:29.67266	2017-06-28 18:47:40.105627	18
38	7wFYbMHTo9nXvxXAHQphoZ2j45UKYPJP	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-06-28 11:11:33.147636	2017-06-28 11:11:33.623124	\N	9
49	CZTjFvGYU3NDiu7bCKJW2s0GyT2Aej3l	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 15:01:05.080865	2017-06-28 15:01:05.717205	\N	14
39	Wwrwa5LzGO02lpawpQmM725bU0jGcVh7	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-06-28 11:22:30.922493	2017-06-28 11:22:31.451229	\N	9
48	R0onOfnVGUtHkkwLAA8nfzBsv4EFctPZ	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 15:01:04.82984	2017-06-28 15:01:08.696271	\N	14
40	VbUFtt2dIHVazX2j28Hf6FlAITv66Kgc	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 14:30:04.46353	2017-06-28 14:30:05.125337	\N	10
41	LOFbO4CTNDGLIupQ7e90sPm69ab7cs3v	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 14:30:04.691598	2017-06-28 14:30:05.926478	\N	10
61	6DzK2uEVzb6yl6DvsS88wZI7uVjJJyrH	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 18:27:57.161768	2017-06-28 18:27:57.90167	\N	16
42	glem6WsCDySnaHh5WSyWzkcCqToBzXgC	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 14:50:43.006194	2017-06-28 14:50:43.86144	\N	11
43	6Z2xHWTDcEe1QpV4JEhlCFrODAzC14ax	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 14:50:43.239846	2017-06-28 14:50:44.197575	\N	11
51	g2APDOVsW1nqdWDwnG9RA4Zkm5N41n2Q	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 15:09:52.310078	2017-06-28 15:09:52.98215	\N	15
50	IBhQsnpFZL9Hefk0hymtJnq8nuF4UF0s	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 15:09:52.117814	2017-06-28 15:09:53.363155	\N	15
45	HuRXWX5STskH8u0nJXBCeIHLPfE3PveN	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 14:52:49.392337	2017-06-28 14:52:50.363517	\N	12
44	TrI6jomhPH15ofGCHeajU6IlVeJ03bi6	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 14:52:49.140486	2017-06-28 14:52:49.981185	2017-06-28 14:56:34.061207	12
57	uYJ2CIqhaVDAOm7fnakbnr8rM1o7A176	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 15:43:27.744498	2017-06-28 15:43:28.667933	2017-06-28 15:44:50.166153	19
47	fsuGvfLJvPeC8HqGStEhATuWL7nL6erN	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 14:59:05.836373	2017-06-28 14:59:07.034435	\N	13
46	0XYdTfxKAS0VQe8qkK8OoxbisdKe2izD	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 14:59:05.566491	2017-06-28 14:59:07.600699	2017-06-28 14:59:09.959015	13
56	f3aRmeIqpxNxGKGR6UjVpoi9hii0QZV6	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 15:43:27.503095	2017-06-28 15:43:28.389792	2017-06-28 15:47:23.431517	19
53	Sqmq5MKUexZ1gGNm8BYoAQScCdNYmTKa	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 15:13:22.399551	2017-06-28 15:13:23.543379	\N	17
52	381UqDjhSoAmeMMAqzsr56rTaUGQvl9n	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 15:13:22.16349	2017-06-28 15:13:24.71604	\N	17
65	043wrvuKvIupV4pqIgDxS5FltphqWRYQ	handyman@email.com	4	User	TradyMailer#work_order_email	Work Order	2017-06-28 18:39:40.513114	2017-06-28 18:39:41.354629	\N	19
58	mxJnSUOktcdQGaWwUqMdcsGeSyFAicXw	handyman@email.com	4	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-06-28 15:47:43.134298	2017-06-28 15:47:43.553318	\N	19
54	xjHqimVJi0DIBNQp6H8xBBqjfBAFJaiD	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 15:17:55.952912	2017-06-28 15:17:56.80397	\N	18
55	GJJ3umbFEvkSR0RTZrbwfJqLZsi4ItGc	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-28 15:17:56.173598	2017-06-28 15:17:57.828583	\N	18
62	HfucaCQrOacClKwX8oMr5B5gptME4VE7	martin@maintenanceapp.com.au	2	User	UserMailer#reset_password_email	Reset Password	2017-06-28 18:34:02.33997	2017-06-28 18:34:05.037214	\N	\N
59	aJfIjwhZWXjK87mMcFsTGwkKfvIf51Ag	handyman@email.com	4	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-06-28 15:51:26.203679	2017-06-28 15:51:26.682411	2017-06-28 15:52:09.941869	19
60	QcrIhGWgQmxe1dICaesVhwQ2yAGw6f3O		\N	\N	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-28 18:27:56.96614	\N	\N	16
63	7f7nO3OPJHOcdRhWwiSebdcbqfVr2kjy	bernard@email.com	6	User	LandlordMailer#send_landlord_maintenance_request	Hi bernard a maintenance request has been made	2017-06-28 18:38:21.818154	2017-06-28 18:38:22.645696	\N	19
67	9nd1MHtfr6ohwmE2EpnTAaBk384B2NEF	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-06-28 18:45:38.960467	2017-06-28 18:45:40.144687	2017-06-28 18:45:59.671308	18
64	WspslwhPXA7YrgXxGjQOOmm0whIvGxTN	handyman@email.com	4	User	TradyMailer#work_order_email	Work Order	2017-06-28 18:39:34.312929	2017-06-28 18:39:35.187844	\N	19
66	rnfQN1035nsFwvBJA1pQGfIXZgDextMM	handyman@email.com	4	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-06-28 18:40:30.623929	2017-06-28 18:40:32.125973	2017-06-28 18:41:12.111518	18
69	xeCdEIafwLdUDoA6PumVonvfxLopVDCF	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-06-28 18:54:09.699214	2017-06-28 18:54:10.578706	2017-06-28 18:54:19.155724	18
73	SN9AH3oQ69LIvBXnE5TK4FHVyUzNkcD6	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-29 04:13:46.263745	2017-06-29 04:13:46.867461	\N	21
71	HYIkJSqC0P4P9Ee0oCGeNCfdAGBKfvv9	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-29 04:11:52.036125	2017-06-29 04:11:52.778942	\N	20
70	9NDZoeHIh7EtSZoAEAhQ8nczLBxumkdW	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-29 04:11:51.78297	2017-06-29 04:11:52.452575	\N	20
72	IgreCgtckayzPlbbe9RC6ZMquU0LvI5x	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-29 04:13:46.048511	2017-06-29 04:13:46.586138	\N	21
84	HC4kOlepZb5OZWBNtDz97OzplaV4tzEW	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Hi A quote has been submitted	2017-06-29 05:48:31.270019	2017-06-29 05:48:31.973888	2017-06-29 05:48:49.093186	23
74	YdbblKxf2vAGjDJ7aXqMkY3I4Jfge4df	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-29 04:58:19.814893	2017-06-29 04:58:20.691236	\N	22
75	qZ1uAVj6pl9WEweCVkb3aEyGa9yDcHpe	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-29 04:58:20.042165	2017-06-29 04:58:20.825885	\N	22
102	L3Hoi1aQScykrfEhkKcQCIHI36bZRdDE	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-06-29 07:51:41.479458	2017-06-29 07:51:42.585402	\N	23
76	XKpgURuo5hJ3HDNpQVH2rjHWuZeIj8dt	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-29 05:01:39.052692	2017-06-29 05:01:39.766083	\N	23
77	xW5qB65rwMwD8S3P4JXx4j9V6D5Ju72t	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-29 05:01:39.282073	2017-06-29 05:01:39.997217	\N	23
85	oeSSpeNtCpBoM2pmXlDwcyb8JX6ZRoTM	bernard@email.com	6	User	LandlordMailer#send_landlord_quote	Hi bernard a quote has been send for a maintenance request job	2017-06-29 05:50:33.967372	2017-06-29 05:50:34.764318	2017-06-29 05:50:58.118298	23
79	BLG31eevWxsQgJrPHCAsocXMke3QKa4K	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-29 05:07:06.365326	2017-06-29 05:07:07.535199	\N	24
78	0EfYnYsZDo8JscdezrpCPm5AwE7RRd7c	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-29 05:07:06.089714	2017-06-29 05:07:10.498473	\N	24
91	julDxNX8iqJrVyqJBhEUS7PZX2jO5VE6	handyman@email.com	4	User	TradyMailer#appointment_accepted_email	Appointment Accepted	2017-06-29 06:56:25.430323	2017-06-29 06:56:26.216348	2017-06-29 06:56:45.546523	23
80	0nkcty0UhpLnaOhrD30hyCXGzPJsHV03	bernard@email.com	6	User	LandlordMailer#send_landlord_maintenance_request	Hi bernard a maintenance request has been made	2017-06-29 05:44:39.788516	2017-06-29 05:44:41.632311	2017-06-29 05:45:00.563257	24
86	ZzlZ3nwnNzgb17ORoJjtEAClvrhtm578	martin@maintenanceapp.com.au	2	User	AgentMailer#request_quote_email	Hi the landlord has requested a quote for a maintenance job	2017-06-29 06:02:50.816087	2017-06-29 06:02:51.929588	2017-06-29 06:03:22.25882	23
81	wtZ7x3vMojO9vJyYsVUVevaqUBpwIuwP	handyman@email.com	4	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-06-29 05:45:36.76544	2017-06-29 05:45:37.542497	2017-06-29 05:45:50.320937	24
96	3Ep9ariPvt6ggaAVIXtMDKkkE3MxmDi5	handyman@email.com	4	User	TradyMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-06-29 07:29:31.465985	2017-06-29 07:29:32.612079	2017-06-29 07:29:43.036533	23
82	PFja2SuSDdV3tthRtsxFeRr0Bw3919pW	handyman@email.com	4	User	TradyMailer#work_order_email	Work Order	2017-06-29 05:46:25.469788	2017-06-29 05:46:25.939718	2017-06-29 05:46:42.767126	24
87	9aYGdcit8VC9Dy3DpETLpNAwaxWCknFZ	handyman@email.com	4	User	TradyMailer#approved_quote_email	Quote Accepted	2017-06-29 06:07:07.773992	2017-06-29 06:07:08.489655	2017-06-29 06:07:56.528991	23
83	gQodpDorWhQysb6EiSwnEwjW1womQJ3F	handyman@email.com	4	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-06-29 05:47:45.004423	2017-06-29 05:47:45.831737	2017-06-29 05:48:03.03933	23
92	p3OZX7GHBhGWhHekfuWES2OZx4HlbGNy	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-06-29 06:57:36.621706	2017-06-29 06:57:37.525095	2017-06-29 06:57:47.392733	23
100	eLPunqJSKrbsiihsi2U8iUs2ZryZRNhF	bernard@email.com	6	User	LandlordMailer#send_landlord_maintenance_request	Hi bernard a maintenance request has been made	2017-06-29 07:46:46.261093	2017-06-29 07:46:47.388004	2017-06-29 07:46:59.585518	23
88	9UXA4TlEYq1r4EVGRIcof9ikxFHKhpE8	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-06-29 06:09:16.433726	2017-06-29 06:09:17.58312	2017-06-29 06:10:45.394328	23
97	qFPbI2ocQMON15P44emdQHdQVuShD3eL	rita@email.com	3	User	TenantMailer#appointment_accepted_email	Hi your appointment time was accepted	2017-06-29 07:30:10.429023	2017-06-29 07:30:12.149065	\N	23
93	kr3rvcJsTSZ4OzhbvoseC8CWYG6X657e	handyman@email.com	4	User	TradyMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-06-29 06:58:47.931195	2017-06-29 06:58:48.582919	2017-06-29 06:59:04.226875	23
89	vY48ijYAVNywuEzKiVOpvtLPKwXHw35v	handyman@email.com	4	User	TradyMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-06-29 06:19:40.152444	2017-06-29 06:19:41.654663	2017-06-29 06:23:22.796339	23
90	inn2emFa1NgwQwtcSpyhOUgv0WEOsGgq	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-06-29 06:39:58.147849	2017-06-29 06:39:59.090478	2017-06-29 06:40:35.005441	23
94	u0ynvpHIr1bICg9EsHjImMPSn99TuSZ3	rita@email.com	3	User	TenantMailer#appointment_accepted_email	Hi your appointment time was accepted	2017-06-29 07:13:23.438975	2017-06-29 07:13:24.452125	\N	23
98	X5FT5UOZwX6XYP2uSusPQb8Yjc1ZWNJl	handyman@email.com	4	User	TradyMailer#appointment_accepted_email	Appointment Accepted	2017-06-29 07:32:11.88112	2017-06-29 07:32:13.662008	\N	23
95	9i8hq2ttryAD5weIgKZPlST5xqZjI5HP	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-06-29 07:26:14.972891	2017-06-29 07:26:15.834327	2017-06-29 07:28:50.740447	23
104	aH9sYNph05iMjyiVuED792fxnSRw7DIV	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-06-29 07:53:56.204192	2017-06-29 07:53:57.727705	\N	23
99	HJ7xhmQPyQxSe8UPNo4AswxfagPKWd1b	rita@email.com	3	User	TenantMailer#appointment_accepted_email	Hi your appointment time was accepted	2017-06-29 07:37:20.843219	2017-06-29 07:37:22.519182	\N	23
101	aZI1rO4HLcHO0C9Xuc8LnTKNhjbiVLhT	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-06-29 07:50:35.903779	2017-06-29 07:50:37.319607	\N	23
103	5teBuHv2VppbBszlAfXj77VMoYrJAFrL	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-06-29 07:53:00.172261	2017-06-29 07:53:01.001428	\N	23
107	yBEOwKVW5Pb82DpIcjYxl3dzV8yjM3oE	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-06-29 07:59:14.954376	2017-06-29 07:59:16.785644	2017-06-29 08:02:11.638358	23
106	a19GNUCauu918GSpeOD8hKe2RcwdttdA	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-06-29 07:58:39.451333	2017-06-29 07:58:40.661293	\N	23
105	NfBkg9jUkSP7AsRfpzvcPmBjl8hJTQAz	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-06-29 07:54:40.053312	2017-06-29 07:54:40.881158	\N	23
108	Z9QK83rpcdNrZvLVINoGq3OXd0N4SJ1M	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-06-29 08:03:54.363625	2017-06-29 08:03:55.541554	2017-06-29 08:04:12.347926	23
109	H46X2z6ZWOW5h6zx3BGVDfGEoytWXlZH	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-06-29 08:04:41.155414	2017-06-29 08:04:42.699729	2017-06-29 08:07:02.47099	23
141	gceUfPEwBmek91vwc8rucWl3R7B4Uijw	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-07-03 13:48:22.580482	2017-07-03 13:48:24.671372	\N	26
127	RiEV3lKVAwu9s2PqTi2xry1PuGRIskP4	bbxapp@gmail.com	9	User	UserMailer#set_password_email	Setup Password	2017-06-30 12:51:42.077743	2017-06-30 12:51:43.056288	\N	\N
110	C6jns8du7GRbf7ERj2GTAUbLTZja0mmC	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-06-29 08:07:24.854321	2017-06-29 08:07:25.699474	2017-06-29 08:07:38.216443	23
120	lUJmHqnHVr8jCyNMchbUWsrzZYBbu43m	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-06-29 12:48:31.691494	2017-06-29 12:48:32.17526	2017-06-29 12:48:44.904594	23
111	NagVEPjKFvfFwPte3LWglGWfuuMrhvvW	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-06-29 08:08:05.059902	2017-06-29 08:08:06.247706	2017-06-29 08:09:17.06441	23
134	fLSdSVQ4sW0wtsOUhjAJkOkVfRF5Ch0b	rita@email.com	3	User	TenantMailer#trady_cancelled_appointment_email	Appointment Cancelled	2017-07-03 09:26:27.63335	2017-07-03 09:26:28.898211	\N	\N
112	oWn8vaClgy4J0Z7cRyrcT0VjC7zNQ9OC	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-06-29 08:09:47.824606	2017-06-29 08:09:49.010875	2017-06-29 08:10:06.287834	23
121	6RU4jewAgvuAM8yNZp8O1dbr1OfwtzuZ	agent@email.com	8	User	UserMailer#set_password_email	Setup Password	2017-06-30 06:09:49.235124	2017-06-30 06:09:50.606228	2017-06-30 06:09:52.624243	\N
113	Ar4nS3GoYPbrYC3EuE00W7zBtRB0ZZ6b	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-06-29 08:10:38.39697	2017-06-29 08:10:39.676726	\N	23
128	N6gs40cyhnUr2ilM5zEfaKZKut877bN8	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-30 12:51:42.725298	2017-06-30 12:51:43.745482	\N	27
114	usL05U0jJcqnjn6G1mQRUbvHmiGNMqeJ	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-29 08:35:48.460096	2017-06-29 08:35:49.479152	\N	25
115	Ls4esY0bQ4mmn2fNEz1nkY0EyjnG7BFd	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-29 08:35:48.820564	2017-06-29 08:35:49.654428	\N	25
129	b8h3CByu5RoW9buE4GI7cbWy2WvHrFWr	bbxapp@gmail.com	9	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-30 12:51:43.112123	2017-06-30 12:51:44.050305	\N	27
122	AxyxsC28HC8Ac3bMBDB5A9ikq9tq4uA0	handyman@email.com	4	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-06-30 11:22:28.159582	2017-06-30 11:22:28.670496	2017-06-30 11:24:31.681325	25
116	MOnv4kvUEatg50cZ7Wm8nWJKStAqASW4	martin@maintenanceapp.com.au	2	User	AgentMailer#send_maintenance_request_invoice	Maintenance Request Invoice	2017-06-29 08:48:16.011319	2017-06-29 08:48:16.879672	2017-06-29 08:49:57.708895	23
117	6WpkCZ9cY1SdnZb5zkz6tAjwraCTbEpw	martin@maintenanceapp.com.au	2	User	AgentMailer#send_maintenance_request_invoice	Maintenance Request Invoice	2017-06-29 08:56:50.432965	2017-06-29 08:56:51.649942	\N	23
133	z8dpOJsjsMdIaRNwenSGKrYlZQVUkqKC	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-03 09:26:27.363096	2017-07-03 09:26:30.789078	\N	23
118	GZzfkNAQGr4IXO1Kq8aFLYpUACkOq68o	martin@maintenanceapp.com.au	2	User	AgentMailer#send_maintenance_request_invoice	Maintenance Request Invoice	2017-06-29 08:57:43.05567	2017-06-29 08:57:44.19251	2017-06-29 08:58:51.627896	23
123	zmoDcdSUqlAmlynYzSQXOd2L0zAZODBJ	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-06-30 11:26:49.464956	2017-06-30 11:26:50.314383	2017-06-30 11:28:02.980118	25
119	gGD8ginAvRNjpqYdy736KiLXdWSumXLH	bernard@email.com	6	User	LandlordMailer#send_landlord_maintenance_request	Hi bernard a maintenance request has been made	2017-06-29 12:47:28.403506	2017-06-29 12:47:29.804382	2017-06-29 12:47:59.323951	23
124	7Al9zX34EFxhffsWVnFVlEfnOUQWGqJg	handyman@email.com	4	User	TradyMailer#appointment_accepted_email	Appointment Accepted	2017-06-30 11:28:09.587027	2017-06-30 11:28:10.048331	\N	25
130	72wbgVey1ELHFqFyDniFQfcKks3JlO7v	tesla@email.com	5	User	UserMailer#reset_password_email	Reset Password	2017-07-03 02:51:44.309747	2017-07-03 02:51:45.271868	2017-07-03 02:51:47.118848	\N
125	DRl0mPyZKyH1VMGRLKs1eZQ8CfF7jpym	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-06-30 12:41:02.917504	2017-06-30 12:41:03.526572	\N	26
126	FNSOzs8OittH0BV7U2m8cWbEnEPnXim6	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-06-30 12:41:03.177072	2017-06-30 12:41:03.948204	\N	26
137	8aYZ8OBvr6dEOASHmD8NPsJsDW4iJjWY	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-07-03 13:34:01.256158	2017-07-03 13:34:02.891951	2017-07-03 13:34:32.409237	26
131	Djeo5qUBJmCaW74pXzJrHEb22NV9cYti	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-03 08:44:14.698971	2017-07-03 08:44:15.629094	\N	23
132	Iwvxc5YJ96dkr7bqcF2Sg8JYJhNiWURW	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-03 09:21:28.628703	2017-07-03 09:21:30.274555	\N	23
140	S5mVifwSWxizv21qa61F92FV4WirAznw	rita@email.com	3	User	TenantMailer#appointment_accepted_by_landlord_email	Hi your appointment time was accepted	2017-07-03 13:48:00.864048	2017-07-03 13:48:01.812349	\N	26
136	bLkcprW4fFHuckqUr44nywNLPJwbkJna	rita@email.com	3	User	TenantMailer#trady_cancelled_appointment_email	Appointment Cancelled	2017-07-03 09:32:33.749946	2017-07-03 09:32:34.565978	\N	\N
135	1RF6rV6DG63ty8s6vCYgcneibay0LBQK	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-03 09:32:33.0905	2017-07-03 09:32:35.708504	\N	23
138	VFRAspgQ7NAHGfNCpgQw4Xjlab16kzw2	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-03 13:41:18.756256	2017-07-03 13:41:19.620995	\N	26
139	wVhMp8m90T5DmmExg5fqzf4aClAFFQUY	bernard@email.com	6	User	LandlordMailer#appointment_accepted_email	Appointment Accepted	2017-07-03 13:44:03.880414	2017-07-03 13:44:05.225587	\N	26
143	Pmq9Jpz3ivAbbJkmsLk1RcjZorkZz4p2	bernard@email.com	6	User	LandlordMailer#appointment_accepted_email	Appointment Accepted	2017-07-03 13:53:39.806509	2017-07-03 13:53:40.96286	\N	26
142	RZk56Nj0lHxUu3IDwwvuqoxul4IuOYYg	rita@email.com	3	User	TenantMailer#landlord_cancelled_appointment	Appointment Cancelled	2017-07-03 13:52:20.899457	2017-07-03 13:52:22.695089	\N	\N
144	POIXBqDJSBCcbtkQsmpA8YMMMuSjh8n9	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-03 13:54:12.953835	2017-07-03 13:54:13.613102	\N	26
145	gm9SyQ33RDHFKZY0aE4mDYYLXqYrEdbo	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-03 13:57:13.365868	2017-07-03 13:57:14.006377	\N	26
146	XBfgDBXU9mZwhOgNMwSYiEL0JJbNNUKJ	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-03 13:59:38.963685	2017-07-03 13:59:39.521193	\N	26
168	bb5uYJuZta6lx40xkAk4QRKkxtdnDgbK	handyman@email.com	4	User	TradyMailer#job_cancelled_email	Job Cancelled	2017-07-03 17:06:45.415664	2017-07-03 17:06:46.14903	\N	\N
160	TOenbBElOTZDjTy8EmycTkL2XPnOlUX2	martin@maintenanceapp.com.au	2	User	AgentMailer#quote_has_been_approved_email	Quote has been approved for a maintenance job.	2017-07-03 17:00:02.225834	2017-07-03 17:00:03.002691	\N	\N
147	rqqCQ3IMvyWF7HqdfkwNYqY2HYJT8G1J	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-03 14:00:51.0314	2017-07-03 14:00:51.696977	\N	26
148	8SKjppmvuZmKw4Fn9YSrH9E1Fad2NZIc	bernard@email.com	6	User	LandlordMailer#tenant_cancelled_landlord_appointment_email	Appointment Cancelled	2017-07-03 14:00:51.431501	2017-07-03 14:00:52.096704	\N	\N
159	mzlTeskdh2jrQb5Ki63RUxycDFSCdzLY	handyman@email.com	4	User	TradyMailer#approved_quote_email	Quote Accepted	2017-07-03 17:00:01.90888	2017-07-03 17:00:03.971565	\N	25
150	LtsTtVkZai11D84XuC1zv2eY7WOELRMp	rita@email.com	3	User	TenantMailer#landlord_cancelled_appointment	Appointment Cancelled	2017-07-03 14:02:28.879175	2017-07-03 14:02:29.589193	\N	\N
149	EDqQeKNi5BCsbLIoM94wSGS0vMwdUINO	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-07-03 14:02:28.479815	2017-07-03 14:02:30.511882	\N	26
151	WAEhYqNRAJmyfC543iCQmUT4OaauflLB	agent@email.com	8	User	AgentMailer#send_agent_quote	Hi A quote has been submitted	2017-07-03 16:38:00.944497	2017-07-03 16:38:02.1643	\N	25
161	or2nPKgyvHKTFyaeeQIRpV91PC6Wk4c2	handyman@email.com	4	User	TradyMailer#job_cancelled_email	Job Cancelled	2017-07-03 17:02:01.345055	2017-07-03 17:02:02.050973	\N	\N
152	1Q32P2SDAK9JB96NcKsyeMuj8z1L5wMc	agent@email.com	8	User	AgentMailer#send_agent_quote	Hi A quote has been submitted	2017-07-03 16:40:33.01521	2017-07-03 16:40:34.7437	2017-07-03 16:42:01.277279	25
181	E8RnQSrh0fF444kLky5SXGlWx4yJl6w7	handyman@email.com	4	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-07-04 17:01:29.880332	2017-07-04 17:01:30.368183	2017-07-04 17:01:44.430392	28
153	jp2ErPggcuJtIqk7VlNgHRP51ArOBndG	handyman@email.com	4	User	TradyMailer#approved_quote_email	Quote Accepted	2017-07-03 16:42:23.273019	2017-07-03 16:42:24.854222	2017-07-03 16:48:46.269335	25
154	ELuVhZiQIF9s9dc4UiV62AYICs9ICuph	handyman@email.com	4	User	TradyMailer#approved_quote_email	Quote Accepted	2017-07-03 16:51:11.88114	2017-07-03 16:51:12.835808	\N	25
163	zv5eIZ4sUDk3TsSZvPE8hC2R4Zuaq6ZP	martin@maintenanceapp.com.au	2	User	AgentMailer#quote_has_been_approved_email	Quote has been approved for a maintenance job.	2017-07-03 17:02:53.242293	2017-07-03 17:02:54.120056	\N	\N
155	MgbvDhyBwlHW7pf4sDMA4Uv36iwkcWI5	handyman@email.com	4	User	TradyMailer#approved_quote_email	Quote Accepted	2017-07-03 16:54:08.511866	2017-07-03 16:54:09.139221	\N	25
162	1zGKKLxyu6p8z4AznzxPYRbEMQ0aEi6y	handyman@email.com	4	User	TradyMailer#approved_quote_email	Quote Accepted	2017-07-03 17:02:52.958394	2017-07-03 17:02:55.128296	\N	25
157	xGYdCCkFqNos31ETFYYWMs0RV2pdxaBA	martin@maintenanceapp.com.au	2	User	AgentMailer#quote_has_been_approved_email	Quote has been approved for a maintenance job.	2017-07-03 16:56:17.149902	2017-07-03 16:56:18.003092	\N	\N
156	qjISDbv8VXpSw233Ndd4RoREYrrkpNup	handyman@email.com	4	User	TradyMailer#approved_quote_email	Quote Accepted	2017-07-03 16:56:09.472969	2017-07-03 16:56:19.770408	\N	25
173	GHI1CwjwxvG0Iua7s7zPFpA1ZQboWh7n	bernard@email.com	6	User	LandlordMailer#notify_landlord_about_message	You have a new message.	2017-07-04 13:27:04.323523	2017-07-04 13:27:05.153979	\N	\N
158	rSicEEbK93UGkczfXnhtxFGe38hPgyFW	handyman@email.com	4	User	TradyMailer#job_cancelled_email	Job Cancelled	2017-07-03 16:58:33.755885	2017-07-03 16:58:34.306446	\N	\N
164	GygoVJfw4X2cHM0w4dGPKOcEUfGvQlaY	handyman@email.com	4	User	TradyMailer#job_cancelled_email	Job Cancelled	2017-07-03 17:04:23.318071	2017-07-03 17:04:23.888421	\N	\N
166	lpp6V5EwE8iHEvr51VNHJ1EGkbF9S1Jz	martin@maintenanceapp.com.au	2	User	AgentMailer#quote_has_been_approved_email	Quote has been approved for a maintenance job.	2017-07-03 17:04:43.010168	2017-07-03 17:04:43.81179	\N	\N
165	Unr5jPYZrwBoVJvWp0Ky4HtaO6zYyk7p	handyman@email.com	4	User	TradyMailer#approved_quote_email	Quote Accepted	2017-07-03 17:04:42.734383	2017-07-03 17:04:45.276222	\N	25
171	OsvBqniHsyBV5DIjwyqDtk3zCcu9FOXn	martin@maintenanceapp.com.au	2	User	AgentMailer#quote_has_been_approved_email	Quote has been approved for a maintenance job.	2017-07-03 17:06:58.500556	2017-07-03 17:06:59.506969	\N	\N
167	41bBc2YmHZpgLW6os6KxDDPRVZPqDPy1	bernard@email.com	6	User	LandlordMailer#quote_has_been_approved_email	Quote for Maintenance Request Has Been Approved.	2017-07-03 17:06:30.237087	2017-07-03 17:06:31.691844	\N	\N
174	iv30xxCgz86u8Khg2uUgBECofMEKW245	bbxapp@gmail.com	9	User	ApplicationMailer#tenant_message_notify_email	New Maintenance Request Message	2017-07-04 15:15:18.337958	2017-07-04 15:15:18.884846	\N	\N
169	zaAawXVGq6Uvh5kWVowYmrzH66KbTmAC	handyman@email.com	4	User	TradyMailer#approved_quote_email	Quote Accepted	2017-07-03 17:06:58.055717	2017-07-03 17:07:00.635155	\N	25
170	ds36PhPcYkkfrEK8lU0lsmThleFvFbTv	bernard@email.com	6	User	LandlordMailer#quote_has_been_approved_email	Quote for Maintenance Request Has Been Approved.	2017-07-03 17:06:58.361602	2017-07-03 17:06:59.276547	2017-07-03 17:07:32.806173	\N
177	T3YfcIOaCyajCzXoKF9lissjguIBaOv5	handyman@email.com	4	User	TradyMailer#notify_picked_trady_about_message	An agent has sent you a message.	2017-07-04 16:02:26.084156	2017-07-04 16:02:26.572277	2017-07-04 16:02:42.905343	\N
172	59fSqIx1IATiK9fE4esAXZvFN33mLwxa	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_landlord_message	A landlord has sent you a message.	2017-07-04 13:21:43.949406	2017-07-04 13:21:45.789595	2017-07-04 13:22:03.517882	\N
175	rAU7djZ1rJDWHGoqviuqrHhIq8jYde6p	bbxapp@gmail.com	9	User	ApplicationMailer#tenant_message_notify_email	New Maintenance Request Message	2017-07-04 15:15:49.493276	2017-07-04 15:15:50.334545	\N	\N
176	1g6VQUkxy2CQa8qqUFo7pRrnUE9zHUFO	bbxapp@gmail.com	9	User	ApplicationMailer#tenant_message_notify_email	New Maintenance Request Message	2017-07-04 15:18:02.073602	2017-07-04 15:18:02.581127	\N	\N
182	swnWwEyhO5tLtptC53SHBPLLqhF2H85t	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-04 17:02:37.725309	2017-07-04 17:02:39.247796	2017-07-04 17:02:48.248872	28
178	BUWANsyDKkmcySLZfLz8JNkl5qM2HPOr	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_trady_message	A trady has sent you a message.	2017-07-04 16:03:10.890506	2017-07-04 16:03:11.631887	\N	\N
180	ODzWgYYFPj0dPN8bWKzPiL46dGLZqHSH	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-04 17:00:59.813745	2017-07-04 17:01:00.680925	\N	28
179	v79e9RxEa9AAwtKxIz8UJnTYtQrJu0oz	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Hi a maintenance request has been made	2017-07-04 17:00:59.400591	2017-07-04 17:01:03.439377	2017-07-04 17:01:15.241861	28
183	VWbJ18rW3yz9NKgHEJSCvdfGyPqEWyc2	handyman@email.com	4	User	TradyMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-04 17:03:23.283961	2017-07-04 17:03:24.792132	\N	28
184	UnV4ObkwmXhPec2ujJnGHwo4WEwKQArL	handyman@email.com	4	User	TradyMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-04 17:08:52.998976	2017-07-04 17:08:54.219534	\N	28
185	CPmXwsAYxfy4jvEGnznlF3clPD53VjX6	handyman@email.com	4	User	TradyMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-04 17:12:10.576924	2017-07-04 17:12:11.11796	\N	28
196	vlhsqDj1PpfE4JlPzPicTDRGdGIDm8SW	bernard@email.com	6	User	LandlordMailer#tenant_declined_landlord_appointment_email	Appointment Cancelled	2017-07-05 03:36:37.355592	2017-07-05 03:36:37.90946	\N	\N
186	4XHDOjI68nNjKQk0lIoGenIM7TDw7ZVQ	handyman@email.com	4	User	TradyMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-05 03:05:32.630375	2017-07-05 03:05:33.869989	\N	28
216	CFD0NiANoOx4BF0TTjmM8mLY0CZrYsRh	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_trady_quote_message	A trady has sent you a quote message.	2017-07-05 07:22:18.827658	2017-07-05 07:22:19.315383	2017-07-05 07:22:26.965216	\N
195	an3jCgV1nmwQQx5FAyh7dUBvtu8iOMMP	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-05 03:36:36.924272	2017-07-05 03:36:38.699801	2017-07-05 03:39:42.42096	28
187	fd8SLu40J4Dvwuy592Wuq5Rjc5yPJpwD	bernard@email.com	6	User	LandlordMailer#send_landlord_maintenance_request	Hi bernard a maintenance request has been made	2017-07-05 03:24:20.066552	2017-07-05 03:24:21.2743	2017-07-05 03:24:31.837702	28
188	wv2TcS6WPxAHCXpSA3ZKef4q9y9atND3	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-07-05 03:24:46.973727	2017-07-05 03:24:47.453334	2017-07-05 03:24:59.527421	28
203	JCpFCjOO7b26OZ5reEcqg5vKcXUrksBs	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-07-05 04:13:50.034306	2017-07-05 04:14:13.891252	2017-07-05 04:15:16.172275	28
197	KWWK5rvqZHBRkhN8rYuUcuekArVYtv6u	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-07-05 03:44:53.39805	2017-07-05 03:44:54.271747	2017-07-05 03:45:31.523912	28
189	gwp9wz0PToCCHqNakZ9iizoDMo2ARYbB	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-05 03:25:21.336283	2017-07-05 03:25:22.629378	2017-07-05 03:27:00.308555	28
190	ESyTsmClRAyz0aTzSANj8O3yVgi3HfxH	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-07-05 03:27:15.142018	2017-07-05 03:27:16.646499	2017-07-05 03:27:36.485634	28
215	5Q6VWyk42jD7dlwpknTRjMWLd2hZhdeY	handyman@email.com	4	User	TradyMailer#notify_trady_about_quote_message	An agent has sent you a quote message.	2017-07-05 07:18:47.403525	2017-07-05 07:18:48.598407	2017-07-05 07:22:00.712433	\N
192	8dSwqToFfnIyR3zoCckP8NAphcGjZz9d	bernard@email.com	6	User	LandlordMailer#tenant_declined_landlord_appointment_email	Appointment Cancelled	2017-07-05 03:27:55.549169	2017-07-05 03:27:56.201257	\N	\N
199	Su5690qHtw9eFSvGKV3zu3AbyuM7Gbjy	bernard@email.com	6	User	LandlordMailer#tenant_declined_landlord_appointment_email	Appointment Time Declined	2017-07-05 03:45:46.632479	2017-07-05 03:45:47.193455	\N	\N
191	bQuXtz8SQPkFZsdt7VKbb3EcapI9ZCDs	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-05 03:27:54.99317	2017-07-05 03:27:57.085664	2017-07-05 03:31:50.022378	28
209	hFwEO1AZm28x1prdpIOWUzoteT7xV3dQ	bernard@email.com	6	User	LandlordMailer#tenant_declined_landlord_appointment_email	Appointment Time Declined	2017-07-05 05:05:51.604344	2017-07-05 05:05:52.192475	\N	\N
198	gwbeYclkZ3M2V012pztaBHgZRg6N47I9	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-05 03:45:46.221745	2017-07-05 03:45:47.531248	2017-07-05 03:46:00.78576	28
194	cmUDbG1JIPNPBtyhyOWzV3WIsTIC3DvR	handyman@email.com	4	User	TradyMailer#tenant_declined_appointment_email	Appointment Declined	2017-07-05 03:32:18.462851	2017-07-05 03:32:19.160881	\N	\N
193	TG4CngB0dXDZWt7e1gImY8OSJUQPM1aY	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-07-05 03:32:03.729992	2017-07-05 03:32:05.614043	2017-07-05 03:36:23.796351	28
208	wKROhzKxja6ryqbbfABYglwLgnFKtbdg	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-05 05:05:51.122394	2017-07-05 05:05:53.195185	\N	28
205	t0ba4R4YAvptx65yyos6AKYRlTuMHphg	bernard@email.com	6	User	LandlordMailer#tenant_declined_landlord_appointment_email	Appointment Time Declined	2017-07-05 04:15:49.882966	2017-07-05 04:15:51.936385	\N	\N
204	I3Q4Slq9nBOQn8EQt4kdNazMYjClahMO	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-05 04:15:30.118804	2017-07-05 04:15:30.740938	2017-07-05 05:04:34.611741	28
200	MghRrrJ77w9QMORSQQ6puh4K88bGwdWg	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-07-05 04:11:22.3461	2017-07-05 04:11:23.664766	2017-07-05 04:12:07.0655	28
202	uyT2iEHLipvFgOnqzj6SkqhQpRJj9Bfc	bernard@email.com	6	User	LandlordMailer#tenant_declined_landlord_appointment_email	Appointment Time Declined	2017-07-05 04:12:21.965594	2017-07-05 04:12:22.697473	\N	\N
201	XoCFxQk7OU31iHjhGqWtFkqr8XL2tVdt	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-05 04:12:21.508704	2017-07-05 04:12:23.667504	2017-07-05 04:12:51.912892	28
211	SvzJeSeprzRcaAuKPzBzKcazzL8TkZpd	bernard@email.com	6	User	LandlordMailer#notify_landlord_about_message	You have a new message.	2017-07-05 06:40:25.217109	2017-07-05 06:40:26.048035	2017-07-05 06:40:47.470939	\N
212	PmbB1G2tLzQUsTIOk3RJCvxQUy8c50Ie	rita@email.com	3	User	ApplicationMailer#tenant_message_notify_email	New Maintenance Request Message	2017-07-05 06:40:35.529828	2017-07-05 06:40:36.714684	2017-07-05 06:41:05.284946	\N
207	QJ9GWlZOinM9ZeOEbLZwTkKriW7w5r8H	rita@email.com	3	User	TenantMailer#landlord_declined_appointment	Appointment Declined	2017-07-05 05:05:02.054373	2017-07-05 05:05:02.746746	\N	\N
206	dl96vOEo2KaDjy2nycOCRpIWD5QIedYF	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-07-05 05:05:01.48687	2017-07-05 05:05:02.61271	2017-07-05 05:05:31.763023	28
210	bCTwiLloc3sx9SeDsaT9J4IaetrIXZiv	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_tenant_message	A tenant has sent you a message.	2017-07-05 06:39:35.480274	2017-07-05 06:39:37.1437	2017-07-05 06:39:48.046254	\N
214	RdLIcKu1Qb6IvOiHKQWPyDj4bWRtLKeH	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_trady_quote_message	A trady has sent you a quote message.	2017-07-05 07:17:21.717306	2017-07-05 07:17:22.902063	2017-07-05 07:17:53.219298	\N
213	Uy0A1wlTDMTCFs7M5Uwj2MuSf9RxROwO	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Hi A quote has been submitted	2017-07-05 07:14:42.693816	2017-07-05 07:14:43.441254	2017-07-05 07:18:07.854394	1
217	zo3RuOyasI4x3I30pjQ1XiLl1WMAZoV5	tesla@email.com	5	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-07-05 07:23:43.122827	2017-07-05 07:23:44.034115	2017-07-05 07:24:01.114299	1
219	UDBqSpBlU4jPcE5gS7ubpKByrBgni1y7	handyman@email.com	4	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-07-05 07:27:11.476873	2017-07-05 07:27:13.053464	2017-07-05 07:27:20.967988	27
220	MfYrRvTmKq3NAB6JxgvGaNHv6sBcuR8v	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Hi A quote has been submitted	2017-07-05 07:27:49.420453	2017-07-05 07:27:51.721069	2017-07-05 07:28:02.588622	27
218	jlFpBsoSyKedGOFadeK0iu0cbp7OY41a	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Hi A quote has been submitted	2017-07-05 07:25:05.675491	2017-07-05 07:25:07.667071	2017-07-05 07:25:20.431402	1
221	vbUJz2VIpZue8kCsY47F8SGTutEWS74o	rita@email.com	3	User	ApplicationMailer#tenant_message_notify_email	New Maintenance Request Message	2017-07-05 11:07:41.246612	2017-07-05 11:07:42.090678	\N	\N
258	nOEhPyEf4YOjIyxLon1r8nNICTB527k0	bernard@email.com	6	User	LandlordMailer#quote_has_been_approved_email	Quote for Maintenance Request Has Been Approved.	2017-07-10 12:44:10.370916	2017-07-10 12:44:10.996865	\N	\N
222	snLRhgZNJSiDcbvwTQaXNFdGzfGTT04O	bernard@email.com	6	User	LandlordMailer#send_landlord_maintenance_request	Hi bernard a maintenance request has been made	2017-07-06 03:43:17.686652	2017-07-06 03:43:19.297273	\N	28
255	8Mj8XbMLxBfc5yvbRsLE0U8j6353wgts	bernard@email.com	6	User	LandlordMailer#send_landlord_quote	Hi bernard a quote has been send for a maintenance request job	2017-07-10 12:39:57.670008	2017-07-10 12:39:58.143178	2017-07-10 12:40:56.163976	30
234	4CNTRGs3TYHaHWaXDwxW7NeBOskCjG7D	martin@maintenanceapp.com.au	2	User	AgentMailer#quote_has_been_approved_email	Quote has been approved for a maintenance job.	2017-07-07 07:47:37.836768	2017-07-07 07:47:38.609308	\N	\N
223	2mr2mYqH3IU1ZTlcULHE9a4gCF3UJheF	handyman@email.com	4	User	TradyMailer#approved_quote_email	Quote Accepted	2017-07-06 06:44:49.780031	2017-07-06 06:44:50.564835	\N	1
241	IT04gbdqVQuY9QyNoOa8SF1u8XVxjnq5	handyman@email.com	4	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-07-10 09:37:45.69035	2017-07-10 09:37:46.143523	\N	30
225	MEp1xxqJdNEfcsC0JpWZBtmZBDVOjko7	bernard@email.com	6	User	LandlordMailer#quote_has_been_approved_email	Quote for Maintenance Request Has Been Approved.	2017-07-06 06:44:51.397737	2017-07-06 06:44:52.009062	\N	\N
224	1HdTmv1pjuNHzGtW6Z2dCDSp6UCvdi0K	martin@maintenanceapp.com.au	2	User	AgentMailer#quote_has_been_approved_email	Quote has been approved for a maintenance job.	2017-07-06 06:44:50.550501	2017-07-06 06:44:54.07367	\N	\N
233	D5AdPeJZ0AOCasjQreVt0HgOVGeWJ65c	handyman@email.com	4	User	TradyMailer#approved_quote_email	Quote Accepted	2017-07-07 07:47:37.052643	2017-07-07 07:47:39.838256	2017-07-07 07:47:54.441635	29
226	Zor4YfzQSiMlHVo3U6FqGoZJeu5mpgqL	bernard@email.com	6	User	LandlordMailer#send_landlord_maintenance_request	Hi bernard a maintenance request has been made	2017-07-06 09:15:34.727869	2017-07-06 09:15:36.54212	\N	22
228	86gi6U73kmtaXxXuqBy6SZNZhsbgAF8j	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-06 10:24:19.414355	2017-07-06 10:24:20.92008	\N	29
227	lPpcw6q9LzwOPXjyHh2wIFbMjOdDrXeI	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-06 10:24:19.034481	2017-07-06 10:24:21.346718	\N	29
235	iaGOa72Int2O7wKZM7jhG4w0Z0AH9OIJ	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-07 07:49:39.145939	2017-07-07 07:49:40.323932	\N	29
229	rFmTqvraDZjqm5yvvRxUrUrFA5AHbRTb	handyman@email.com	4	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-07-07 07:23:20.506585	2017-07-07 07:23:22.273221	2017-07-07 07:23:33.895455	29
246	aKjCbK72gu4JrxybQgQGa3L8gMnH9Hod	tesla@email.com	5	User	TradyMailer#tenant_declined_appointment_email	Appointment Declined	2017-07-10 12:12:01.196397	2017-07-10 12:12:01.711191	\N	\N
236	WhacbE26WtV9zFU9YWbjZ7GrFU6xN9PZ	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-07 07:51:09.897042	2017-07-07 07:51:10.456821	\N	29
230	PoK9T2inJetm5eS22S2MoH7TsTWUHgVO	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Hi A quote has been submitted	2017-07-07 07:36:45.246998	2017-07-07 07:36:46.966683	2017-07-07 07:38:04.401886	29
242	Rx6O05EbcxUxMTRNpfL2BCpq9zjfGCPv	bernard@email.com	6	User	LandlordMailer#send_landlord_maintenance_request	Hi bernard a maintenance request has been made	2017-07-10 09:39:00.653428	2017-07-10 09:39:01.102251	\N	30
232	XSA4ie2LCnRgnSepYd3LXvo2BxyyRFaq	martin@maintenanceapp.com.au	2	User	AgentMailer#quote_has_been_approved_email	Quote has been approved for a maintenance job.	2017-07-07 07:38:34.702203	2017-07-07 07:38:35.326309	\N	\N
231	QUK2HAwY7uZwJKsjrUzdf1WNsw8h0Yf8	handyman@email.com	4	User	TradyMailer#approved_quote_email	Quote Accepted	2017-07-07 07:38:33.813744	2017-07-07 07:38:36.336771	\N	29
237	QoSeLFVMc2SyJ3y0cEOroX1e9Mm9twHa	bernard@email.com	6	User	LandlordMailer#notify_landlord_about_message	You have a new message.	2017-07-10 08:36:49.006526	2017-07-10 08:36:50.506087	\N	\N
245	wxN25WLi0m8bd4ecfl3SiyKhfzL3Aksk	tesla@email.com	5	User	TradyMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-10 12:12:00.749946	2017-07-10 12:12:02.211023	2017-07-10 12:19:37.610363	30
239	I5VVSNhku2ybAu4LjT1I4bXA81OzeGGv	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-10 09:25:55.540151	2017-07-10 09:25:56.564168	\N	30
238	ZO0fq23Kw8yzK1ewj5p8IWQc8kz2Bwxe	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Oxford Street, Paddington, New South Wales, Australia	2017-07-10 09:25:55.341801	2017-07-10 09:25:58.192315	\N	30
243	AXf5WUXhvZRHzVUwFwluBQIEhY5zfyj6	tesla@email.com	5	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-07-10 11:34:20.785237	2017-07-10 11:34:22.468623	2017-07-10 11:34:34.499409	30
240	zvXTWALFqtlvPKq45V4HbfvcfGXs8YXn	rita@email.com	3	User	ApplicationMailer#tenant_message_notify_email	New Maintenance Request Message	2017-07-10 09:33:29.180679	2017-07-10 09:33:29.935682	2017-07-10 09:33:41.864775	\N
251	omY94WdiybY9UrH4ZXNOZySQS1GaW971	tesla@email.com	5	User	TradyMailer#approved_quote_email	Quote Accepted	2017-07-10 12:35:19.995674	2017-07-10 12:35:20.589487	\N	30
244	eq1PpaqfHDAvTFKkeCKLoO1rTv2XI9bK	rita@email.com	5	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-10 11:50:09.243613	2017-07-10 11:50:10.390715	2017-07-10 12:10:26.409793	30
249	uIWvYiMpL5X7K6geNaUloiqz1D6C859L	martin@maintenanceapp.com.au	2	User	AgentMailer#quote_has_been_approved_email	Quote approved by landlord Bernard - @property.property_address.	2017-07-10 12:34:07.993232	2017-07-10 12:34:08.716827	\N	\N
250	2U1vPoAbh4lgNPCqUe3NjlhlnBreLvn8	bernard@email.com	6	User	LandlordMailer#quote_has_been_approved_email	Quote for Maintenance Request Has Been Approved.	2017-07-10 12:34:08.581337	2017-07-10 12:34:09.193191	\N	\N
247	HKz4Fbq4AdHZfH1ySujukObpeI1y8w1w	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Quote recieved from Elon - @property.property_address	2017-07-10 12:28:39.79425	2017-07-10 12:28:41.624737	2017-07-10 12:30:05.378369	30
248	fO9bgFm9TelgVTtH30RdwHJ4xUGI56dk	tesla@email.com	5	User	TradyMailer#approved_quote_email	Quote Accepted	2017-07-10 12:34:07.310072	2017-07-10 12:34:09.544347	\N	30
254	oskpokWwnadmC09uQRw61JrCWrMhHUor	bernard@email.com	6	User	LandlordMailer#send_landlord_quote	Hi bernard a quote has been send for a maintenance request job	2017-07-10 12:35:48.386829	2017-07-10 12:35:48.840215	\N	30
253	dHHjnsNd569FykFb5S5mtilrofu80d25	bernard@email.com	6	User	LandlordMailer#quote_has_been_approved_email	Quote for Maintenance Request Has Been Approved.	2017-07-10 12:35:21.215003	2017-07-10 12:35:21.914596	\N	\N
252	KKxw7fd3aKUShLeCYyscceXYSyY9plV4	martin@maintenanceapp.com.au	2	User	AgentMailer#quote_has_been_approved_email	Quote approved by landlord Bernard - @property.property_address.	2017-07-10 12:35:20.654928	2017-07-10 12:35:22.80186	\N	\N
256	bI5qzT3TSBUM0lOA9jKw0hYO3NLAZsuw	tesla@email.com	5	User	TradyMailer#approved_quote_email	Quote Accepted	2017-07-10 12:44:09.184707	2017-07-10 12:44:11.918447	\N	30
257	Zh2tNIk61Sn1ssMmXK6qjhcvmbVm6rfM	martin@maintenanceapp.com.au	2	User	AgentMailer#quote_has_been_approved_email	Quote approved by landlord Bernard - @property.property_address.	2017-07-10 12:44:09.763501	2017-07-10 12:44:10.395584	\N	\N
270	lQ8lb7wyriYcxVI4UV8CRE5Rl7YWQjTf	tesla@email.com	5	User	TradyMailer#job_cancelled_email	Job Cancelled	2017-07-10 13:31:02.657869	2017-07-10 13:31:03.135872	\N	\N
259	XZIAQrBC05N8XTTwE2XE64U6Vqgezm9W	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-07-10 12:48:04.009703	2017-07-10 12:48:05.445405	2017-07-10 12:49:02.844503	30
281	m7N5wHl5kTkqNeRLkwdcT5f8vBi1p7gR	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 34 Princes Highway, Port Fairy, Victoria, Australia	2017-07-12 09:44:00.315771	2017-07-12 09:44:01.43395	\N	36
261	zL45eQR2KEYm3IviLnxJ5odYCHzY8b1e	bernard@email.com	6	User	LandlordMailer#tenant_declined_landlord_appointment_email	Appointment Time Declined	2017-07-10 12:49:22.569886	2017-07-10 12:49:23.244055	\N	\N
277	dQKznhxdCSia2ze2lu9YPs5EfXAjF3sr	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-12 08:57:12.619687	2017-07-12 08:57:13.628168	\N	34
260	9FG3f0o0ZVA0CKU4oevNwuf2YU8Pi0hn	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-10 12:49:22.252854	2017-07-10 12:49:23.444286	2017-07-10 13:13:14.456446	30
272	jsqq0wNofYvdoLUaw6rQm7f00OwNNeyX	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-11 08:45:54.607254	2017-07-11 08:45:55.506897	\N	31
271	hfrhoGPKYlKJm46J3qXYPXeVhUriLxUc	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 345 Princes Highway, Woonona, New South Wales, Australia	2017-07-11 08:45:54.332475	2017-07-11 08:45:56.236324	\N	31
263	gjGbzeWUA1Sn05cOORanQ3riOUf0yM1a	rita@email.com	3	User	TenantMailer#landlord_declined_appointment	Appointment Declined	2017-07-10 13:13:32.370448	2017-07-10 13:13:33.006343	\N	\N
262	aZcwxG3H4jr6Ubpt11PLp5xvte1TUP4w	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	New Appointment Time Requested	2017-07-10 13:13:31.978489	2017-07-10 13:13:32.615116	2017-07-10 13:14:04.517906	30
278	XFnNMfHyL9TI4e7IeDSAk5gZ3bEEJrp9	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-12 08:57:12.888473	2017-07-12 08:57:14.027912	\N	34
265	JYDjL4LpGk6igRYjsjgpPkLo82GiPMb2	bernard@email.com	6	User	LandlordMailer#tenant_declined_landlord_appointment_email	Appointment Time Declined	2017-07-10 13:14:26.413677	2017-07-10 13:14:27.140768	\N	\N
264	h99fX3VhgPdSJ2BkCsXX6dQHJSvV0zDo	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-10 13:14:25.9505	2017-07-10 13:14:27.433545	\N	30
266	Jpq2CSSNkDJ6A6haJ4KZe740DCq6xiDW	tesla@email.com	5	User	TradyMailer#job_cancelled_email	Job Cancelled	2017-07-10 13:19:02.222681	2017-07-10 13:19:03.644887	\N	\N
274	ZB11AQh8NwMoohN3LaQF2BuxZ8bLWMYK	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-12 08:43:38.607552	2017-07-12 08:43:39.783627	\N	32
273	GzEkUSljCeyC6tLfyEcdVwVzXXPGV7IB	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 345 Princes Highway, Woonona, New South Wales, Australia	2017-07-12 08:43:38.375322	2017-07-12 08:43:41.223285	\N	32
269	v3JMWeRO9hE0KPvhYREtxFSdzPQTkMDh	bernard@email.com	6	User	LandlordMailer#quote_has_been_approved_email	Quote for Maintenance Request Has Been Approved.	2017-07-10 13:30:12.720266	2017-07-10 13:30:13.493703	\N	\N
267	6djO0vEFKQNvoDSOY08kJOmsYx0UvDLR	tesla@email.com	5	User	TradyMailer#approved_quote_email	Quote Accepted	2017-07-10 13:30:11.087174	2017-07-10 13:30:13.94332	\N	30
268	emPJjT7HSaImspFUZsKhszbu1xWy301y	martin@maintenanceapp.com.au	2	User	AgentMailer#quote_has_been_approved_email	Quote approved by landlord Bernard - @property.property_address.	2017-07-10 13:30:11.887149	2017-07-10 13:30:14.278453	\N	\N
282	H9A8s5RzkPuJIM9CA7nsFQdQnESVpfT5	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-12 09:44:00.615211	2017-07-12 09:44:01.684129	\N	36
276	BAWBYUVAV98PZQDCxwuRTACflyFGcFG8	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-12 08:46:42.577089	2017-07-12 08:46:44.134197	\N	33
275	6VexJTFeG0BBKkB5ruwtsW1q1KypzgOk	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-12 08:46:42.367618	2017-07-12 08:46:44.621991	\N	33
290	YcfBwScIUnqUQ5XpPIEwYtmcYIhJFLj0	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-12 10:00:34.641319	2017-07-12 10:00:35.474644	\N	40
280	zKNigvbqG49gzbMfLxkGiVR5jdwa9OtE	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-12 09:02:25.466856	2017-07-12 09:02:26.362301	\N	35
279	qgmUMAQNxSB8lGHuPHublcxf2ccpwDrn	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-12 09:02:25.090025	2017-07-12 09:02:27.234701	\N	35
286	lH7by96RWEQ8KxRuW2UP9f3E7AlEeDeA	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-12 09:51:10.469785	2017-07-12 09:51:11.396695	\N	38
283	lhMXmSdqlqSOf4976LvfrRbIBei1DKrW	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 345 Princes Highway, Woonona, New South Wales, Australia	2017-07-12 09:48:17.012597	2017-07-12 09:48:18.026201	\N	37
284	eFLBOCu6nlTJHft6Mc5CoJ9UIyEWYmG0	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-12 09:48:17.287825	2017-07-12 09:48:18.252434	\N	37
285	9LpWgdyTmiq0RiQM3R1EcXAjD5GnqNvO	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-12 09:51:10.220347	2017-07-12 09:51:12.179586	\N	38
287	IZVnIplV8vh1euJZurFeoHTJ9eUKxxpj	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 567 George Street, Sydney, New South Wales, Australia	2017-07-12 09:56:59.994838	2017-07-12 09:57:01.760982	\N	39
288	SsGwJ8Y6UnwNKG1uSRrnr6nxRw13J04F	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-12 09:57:00.241999	2017-07-12 09:57:01.060457	\N	39
292	qiEQAur7DNK1IkBtYTxblE4J61qlOmD1	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-12 10:28:40.427649	2017-07-12 10:28:41.46584	\N	41
289	suMw04ChoDgIYOHDZjLUyGdu4zMZRtfx	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-12 10:00:34.371188	2017-07-12 10:00:35.276934	\N	40
362	elpJAPzOzE5AxZtSRbW4ADGYHxlJVjRX	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-19 16:54:07.843614	2017-07-19 16:54:08.557577	\N	62
291	73nQ1K2B00LSSCNVDSB9rFZzRzlQ09hU	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 345 Princes Highway, Woonona, New South Wales, Australia	2017-07-12 10:28:40.009022	2017-07-12 10:28:41.070104	\N	41
293	ETQyKB247lzIviOupFY7JI74yTND22fc	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 7465 Goulburn Valley Highway, Kialla West, Victoria, Australia 	2017-07-12 10:31:15.82584	2017-07-12 10:31:16.921589	\N	42
294	okYSO1ORrL9SNEJiQfOlFZ9dl317AaD1	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-12 10:31:16.149183	2017-07-12 10:31:17.291305	\N	42
306	G2ZXVk9zP7znKsFPEZUcgmZh7kTWau7B	rita@email.com	3	User	TenantMailer#trady_declined_appointment_email	Appointment Declined	2017-07-13 03:02:00.753255	2017-07-13 03:02:01.491018	\N	\N
296	0fe4b7SEIH75g2yK4iTeYWv1xWsDsagO	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-12 13:46:18.4918	2017-07-12 13:46:19.952228	\N	43
295	7lcHFiWixr8ZweOQmauMYd22TEsxlvzD	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 345 Princes Highway, Woonona, New South Wales, Australia	2017-07-12 13:46:18.173875	2017-07-12 13:46:23.300767	\N	43
305	delXxA3pIhNpV2ogpq2MAQDmDwhkyd56	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-13 03:02:00.398733	2017-07-13 03:02:01.866247	\N	30
297	xDUNuDaYeRua9lTrxqFZYC8PEXN2QexW	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 345 Princes Highway, Woonona, New South Wales, Australia	2017-07-12 13:49:33.576618	2017-07-12 13:49:34.531079	\N	44
298	diwnzOcywPO3W2sONg23xRMAUD2ijUSK	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-12 13:49:33.895995	2017-07-12 13:49:35.003251	\N	44
313	FtnmVdVNw06lkDlmN5kDQh8nvEDJY9z3	martin@maintenanceapp.com.au	2	User	AgentMailer#quote_has_been_approved_email	Quote approved by landlord Bernard - @property.property_address.	2017-07-13 04:14:37.05543	2017-07-13 04:14:37.722127	\N	\N
299	KbndIVSlsIrG7nyjHAukjiAHlhtjwocf	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 567 George Street, Sydney, New South Wales, Australia 	2017-07-12 14:21:40.315127	2017-07-12 14:21:41.144184	\N	45
300	sEmwMTOxV7cQxx4Di2meQK91Ygmdo9xo	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-12 14:21:40.476706	2017-07-12 14:21:41.333995	\N	45
307	bahwUCvAbC8qqEKr30UEfGwkLWr2Ygpd	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Quote recieved from Handy man - @property.property_address	2017-07-13 03:16:11.406639	2017-07-13 03:16:12.753134	2017-07-13 03:26:32.632828	30
301	ekknWKENTptX81FDiCMCt0v6uASQhXMi	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 567 George Street, Sydney, New South Wales, Australia	2017-07-12 14:31:10.453776	2017-07-12 14:31:11.377784	\N	46
302	aHFBb778r4NhXukNPizADI94bVGewdI0	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-12 14:31:10.685114	2017-07-12 14:31:11.724518	\N	46
323	IWJbHs3hDlTTTPbTptOCRFYijJiLY1Al	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-14 07:40:44.860634	2017-07-14 07:40:45.779693	\N	50
308	xkHXdJBBmLBAxxlx97HJQOLLfGfyIwtJ	bernard@email.com	6	User	LandlordMailer#send_landlord_quote	Hi bernard a quote has been send for a maintenance request job	2017-07-13 03:54:03.882602	2017-07-13 03:54:05.845793	\N	30
304	OPvNcbGVjEwsJTwzXNGZqdDIHL4Jjy1X	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-12 14:37:09.503372	2017-07-12 14:37:10.448059	\N	47
303	JRwDWdRSVvVnlPUgZSsQ0PcZuE3XEqkC	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 567 George Street, Sydney, New South Wales, Australia	2017-07-12 14:37:09.271976	2017-07-12 14:37:11.227967	\N	47
314	G4xGHNfIBeOtIbcjLntGGDUvqHs14beh	bernard@email.com	6	User	LandlordMailer#quote_has_been_approved_email	Quote for Maintenance Request Has Been Approved.	2017-07-13 04:14:37.749995	2017-07-13 04:14:38.384765	\N	\N
317	Owvb5iEUFInsJo0KcG24eEjVQMyFhL86	martin@maintenanceapp.com.au	2	User	AgentMailer#send_maintenance_request_invoice	Invoice recieved from Handy man - @property.property_address	2017-07-13 06:08:46.293838	2017-07-13 06:08:47.158808	\N	30
309	m1g3bBWOYbNcTE1xKILGGXqEuQtspL66	bernard@email.com	6	User	LandlordMailer#send_landlord_quote	Hi bernard a quote has been send for a maintenance request job	2017-07-13 03:54:23.427553	2017-07-13 03:54:24.534165	\N	30
310	0PDLKXpmQAJQJc3JBzARwkRkJxzxfAXU	bernard@email.com	6	User	LandlordMailer#send_landlord_quote	Hi bernard a quote has been send for a maintenance request job	2017-07-13 03:56:39.530153	2017-07-13 03:56:40.680702	\N	30
311	K5fEheFhx5dHpA6Jqxe5diLdnz3gR3PJ	bernard@email.com	6	User	LandlordMailer#send_landlord_quote	Hi bernard a quote has been send for a maintenance request job	2017-07-13 04:00:21.86099	2017-07-13 04:00:23.012575	\N	30
318	KYk2y06s6Mko7pLpthvyQOmTlnbfBxUl	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-14 07:31:51.433937	2017-07-14 07:31:52.503115	\N	48
319	JMk6ReU05fpcnRkOZTh7W89sgNSdhoMD	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-14 07:31:51.717152	2017-07-14 07:31:52.683973	\N	48
315	A299radFuL8KKBK5T8QmTTTjV45uaee6	bernard@email.com	6	User	LandlordMailer#notify_landlord_about_message	You have a new message.	2017-07-13 04:37:28.223178	2017-07-13 04:37:30.180134	2017-07-13 04:37:59.504293	\N
316	c8h4CnhgD2bPRkZj22AhbSc2eXIk6GMc	rita@email.com	3	User	ApplicationMailer#tenant_message_notify_email	New Maintenance Request Message	2017-07-13 04:37:45.179416	2017-07-13 04:37:46.311319	2017-07-13 04:38:24.98811	\N
312	ob9T7V6bBP2wdQfc94DXa1qA2r1DNmkr	handyman@email.com	4	User	TradyMailer#approved_quote_email	Quote Accepted	2017-07-13 04:14:36.275634	2017-07-13 04:14:38.909088	2017-07-13 05:58:42.024234	30
321	x5s6uvmas7IcsybaKH0IMsZD59qfrBeZ	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-14 07:38:22.304802	2017-07-14 07:38:23.436328	\N	49
320	lqO71uQM40MJ28B9anfOFv0mJc9czyG4	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-14 07:38:22.064776	2017-07-14 07:38:24.070812	\N	49
324	Tj4Xg4EjmAVaaPFsddeI6Gj4eHqPDAuM	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 34511 Princes Highway, Suttontown, South Australia, Australia	2017-07-14 07:44:05.970988	2017-07-14 07:45:18.505817	\N	51
322	RgbW93JaNu9teHI2nKSqPd5Goeq5XFoe	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 2345 Albany Highway, Gosnells, Western Australia, Australia	2017-07-14 07:40:44.655776	2017-07-14 07:40:45.579593	\N	50
327	DHqgR9GyragdyRvWCoHSYB4ClHMcQxH0	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-14 08:03:58.381189	2017-07-14 08:03:59.187364	\N	52
325	9EQOxgkdiCy28fTrUnIpImMFJotytB2w	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-14 07:44:06.183403	2017-07-14 07:45:15.235812	\N	51
326	EMhBUaY0Z3SEMzAU7VTbkgW9QVUDjHNk	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 1234 hgfdhg	2017-07-14 08:03:58.203891	2017-07-14 08:03:58.960516	\N	52
363	4jO1WY9U3Jtn5KTFP3l3yKZRvuv34zgv	rita@email.com	3	User	ApplicationMailer#tenant_message_notify_email	New Maintenance Request Message	2017-07-19 17:02:53.983735	2017-07-19 17:02:55.09961	\N	\N
338	CVhDdPYNYmarh3ZgHWPAcBcXyHJR3XFQ	rita@email.com	3	User	ApplicationMailer#tenant_message_notify_email	New Maintenance Request Message	2017-07-14 19:05:50.043054	2017-07-14 19:05:51.815698	2017-07-14 19:05:59.091369	\N
329	Jc9D9JUqlzdNz1tVHpZSErcXUSlxiRWR	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-14 08:07:45.62389	2017-07-14 08:07:46.81197	\N	53
328	O1FP3NYRxmLfoCqPckY26IxzvPE8UBXq	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 567 George Street, Sydney, New South Wales, Australia	2017-07-14 08:07:45.358765	2017-07-14 08:07:47.714447	\N	53
330	jGMcKrCtRttdgbFFa3joQnTV6RKspqIU	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-14 08:09:57.391887	2017-07-14 08:09:58.343799	\N	54
331	xLPXxWdC8DPkKyPZax2QpwzWYeCl5KnR	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-14 08:09:57.601655	2017-07-14 08:09:58.521232	\N	54
339	Z2LECjAdKKwXq7JmnjrTOdWhCLsSh8b3	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_tenant_message	New message from tenant Rita - @property.property_address.	2017-07-14 19:06:06.457341	2017-07-14 19:06:08.225479	\N	\N
333	OMvbOoRkV65PvePneouBN0WYymX1PzTj	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-14 08:11:22.266921	2017-07-14 08:11:23.155923	\N	55
332	ZekELWPKfNnbN9k4nzzMLcPcuiaqOIwM	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-14 08:11:22.024429	2017-07-14 08:11:27.820247	\N	55
350	QTPoc4cQnsqJhVdUoD39N0ZmL40D1798	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 345 Princes Highway, Woonona, New South Wales, Australia	2017-07-16 14:15:17.001335	2017-07-16 14:15:18.219165	\N	59
335	bBWwqcc1pRbria3QzqoHe4NBhAYGkQzl	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-14 08:12:48.915967	2017-07-14 08:12:49.787629	\N	56
334	GvXCfjMtIwluheiJ8a6X2UcsJHRxh5xO	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 35 Princes Highway, Eden, New South Wales, Australia	2017-07-14 08:12:48.596812	2017-07-14 08:12:51.054954	\N	56
351	AYRlIbOeikiD3vWxPpYkTfxCj1BM5cVA	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-16 14:15:17.312278	2017-07-16 14:15:18.54163	\N	59
336	VnEvm6GozeUHfz2h7TZ04cYO3qg8x11g	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-14 10:31:31.725881	2017-07-14 10:31:32.721389	\N	57
337	iRgPMXzsQxDHPkuh0rRWDtv9kLlFHBGN	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-14 10:31:32.003029	2017-07-14 10:31:32.932344	\N	57
342	qsDN2M1PC8nujAsj7pAx0hVSr0owFsRZ	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote has been requested for your maintenance request	2017-07-16 11:43:47.631839	2017-07-16 11:43:48.729438	\N	\N
340	c8fN6WO0PVsSkMNwdl6zCBsURPnEK3ws	electro@email.com	10	User	UserMailer#set_password_email	Setup Password	2017-07-16 11:43:45.455586	2017-07-16 11:43:49.454957	\N	\N
341	8FJt8nXD8ydCiDO9VavA2m0VOou6N3a0	electro@email.com	10	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-07-16 11:43:46.200582	2017-07-16 11:43:47.438642	2017-07-16 11:44:25.530241	30
346	lGvwut3eq2akh1MWIT6Z20bCxNvxqgZA	stalin@email.com	12	User	UserMailer#set_password_email	Setup Password	2017-07-16 12:11:49.046388	2017-07-16 12:11:52.284657	\N	\N
347	FW3hrNSH6b6jopgiCOOIb7OxmNskkAte	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Phina - 1235 Princes Highway, Heathmere, Victoria, Australia 	2017-07-16 12:11:50.14189	2017-07-16 12:11:52.944382	\N	58
349	KsX2pbSSjhdmMv5AzGmI8lhZBa6UDt17	stalin@email.com	12	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-16 12:11:50.987648	2017-07-16 12:11:53.18142	\N	58
344	olZHI1Lf1DgTJ50U44YHFTuxywilhfDm	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote has been requested for your maintenance request	2017-07-16 11:46:06.025317	2017-07-16 11:46:08.646748	\N	\N
343	tVPuvUob6BzNQBxctNB4cjp02OPbfFks	handyman@email.com	4	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-07-16 11:46:05.097737	2017-07-16 11:46:08.253908	2017-07-16 11:46:27.482311	57
348	lF46DO6oJSK5uw871WGbQ5hM2fdK8DBJ	joshephina@email.com	11	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-16 12:11:50.520327	2017-07-16 12:11:53.286363	\N	58
345	g0h2dd5Mm5WLBu3bNhwIhLlu1KVFFyYn	joshephina@email.com	11	User	UserMailer#set_password_email	Setup Password	2017-07-16 12:11:46.039732	2017-07-16 12:11:57.782424	\N	\N
354	9SiYiqucjdiahaATJgRbuHBSEmujKyS4	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 345 Princes Highway, Woonona, New South Wales, Australia	2017-07-16 15:39:32.754898	2017-07-16 15:39:33.92695	\N	61
353	hzIa8Jf3SMkdwcGd3iaFZz8ukZ0bUOEF	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-16 15:38:29.180172	2017-07-16 15:38:30.852175	\N	60
352	jAeq5LUtuPbMmEivc2TWs7BfWfcDQsPv	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-16 15:38:28.703461	2017-07-16 15:38:31.766263	\N	60
355	ZE9Wt1tNBIq6MnlCR3TpLGM5Svw39NRW	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-16 15:39:33.074779	2017-07-16 15:39:34.540833	\N	61
358	tGUvXly4iQTjtJuVtokqxjuOMSj18OAZ	handyman@email.com	4	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-07-19 02:49:40.651108	2017-07-19 02:49:41.979013	\N	61
356	FYaWxwabBWARff4cuaDGUWaHPaV3MP1o	tony@email.com	13	User	LandlordMailer#send_landlord_maintenance_request	Hi Tony Italian a maintenance request has been made	2017-07-19 02:20:51.352547	2017-07-19 02:20:53.398547	\N	61
357	lWhzZl9qV5ji2YetAcWXXCpfeHsTfB4t	tony@email.com	13	User	UserMailer#set_password_email	Setup Password	2017-07-19 02:20:51.356324	2017-07-19 02:20:52.072512	2017-07-19 14:15:01.279148	\N
359	59RPhd3B1UaWl14i298Sko8IzEKvPYQu	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote has been requested for your maintenance request	2017-07-19 02:49:40.847093	2017-07-19 02:49:41.537017	\N	\N
360	LPra6xpWZOwWmNkR1X5p7xcNS2SIcPow	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-19 12:56:14.70424	2017-07-19 12:56:16.164716	\N	61
361	OkWEsbNVvdFkgwi6AySpxOsXVUWeOjnv	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 1235 Princes Highway, Heathmere, Victoria, Australia	2017-07-19 16:54:07.60266	2017-07-19 16:54:08.436629	\N	62
376	BOYftyDhnHBrAbYzX8HJDEJjFojn0sCm		\N	\N	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Theo - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-21 02:45:06.543064	\N	\N	63
364	fhXHJNa9YkGorxbs83FfEl1wM14TUxHZ	bernard@email.com	6	User	LandlordMailer#send_landlord_maintenance_request	Hi bernard a maintenance request has been made	2017-07-19 17:04:06.234352	2017-07-19 17:04:07.615605	\N	62
389	mgYEoj1N7OkYl94LOutIRne1hB5PWbFG	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_landlord_message	New message from landlord Bernard - @property.property_address.	2017-07-25 20:50:18.943174	2017-07-25 20:50:20.30697	2017-07-25 20:52:24.148842	\N
366	SScRy894t3GYjw1ys7Rm2tlfzoWnYIjg	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote has been requested for your maintenance request	2017-07-19 17:04:39.821964	2017-07-19 17:04:40.432145	\N	\N
365	rH8cnxjvNe3NZnhlPgKV2wO01VSSqtV1	handyman@email.com	4	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-07-19 17:04:39.254363	2017-07-19 17:04:41.17744	\N	62
377	bUnWMWyRqf0B1alUWyKkQZOcIeXo1faa	theocat@email.com	14	User	ApplicationMailer#email_extra_tenant	Tenants Maintenance Request	2017-07-21 02:45:06.722922	2017-07-21 02:45:07.326636	\N	63
375	QBqLZ36M2uap0RyUzSxP0bWWnJeNNGsM	theocat@email.com	14	User	UserMailer#set_password_email	Setup Password	2017-07-21 02:45:05.745021	2017-07-21 02:45:09.105619	\N	\N
367	miemia9lAVAVWzZy3tx8EzQvEjm6CQX5	handyman@email.com	4	User	TradyMailer#work_order_email	Work Order	2017-07-19 17:07:15.57806	2017-07-19 17:07:16.21449	\N	62
368	pD5WWgXxJ5CbMbAWeorYnJvfBdMJ8Nau	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote has been requested for your maintenance request	2017-07-19 17:07:16.001691	2017-07-19 17:07:16.597384	\N	\N
369	uhb1N9OfpabyKA6uCguVlNy6YUhkMo3l	bernard@email.com	6	User	LandlordMailer#send_landlord_maintenance_request	Hi bernard a maintenance request has been made	2017-07-19 18:17:07.731677	2017-07-19 18:17:08.570644	\N	62
370	kTC69HXH7DbB0ivxDkLwVpKht4jOnhC4	bernard@email.com	6	User	LandlordMailer#send_landlord_maintenance_request	Hi bernard a maintenance request has been made	2017-07-19 18:17:47.613507	2017-07-19 18:17:48.097979	\N	60
378	vYrM6aYmXnJWUZjR6AsFtWYv5hbieP2O	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 1235 Princes Highway, Heathmere, Victoria, Australia	2017-07-24 02:55:57.658625	2017-07-24 02:55:58.528571	\N	\N
371	6RnpjpDMGyfOKswg8EaYLbsrkbPilArO	bernard@email.com	6	User	LandlordMailer#send_landlord_maintenance_request	Hi bernard a maintenance request has been made	2017-07-19 18:18:04.88064	2017-07-19 18:18:05.405692	\N	60
382	9ftYwYJ1IpefMRQoupC2nM1A7fwYfEmr	tony@email.com	13	User	LandlordMailer#send_landlord_maintenance_request	Landlord instructions required - 345 Princes Highway, Woonona, New South Wales, Australia	2017-07-25 16:06:07.71	2017-07-25 16:06:08.66232	2017-07-25 16:06:21.953314	64
373	h1p8WaWO6YpmxbojjW4MoXpwRF0yHK69	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote has been requested for your maintenance request	2017-07-19 18:52:19.04881	2017-07-19 18:52:19.754391	\N	\N
379	gn3fXoHa9ufXW1g9HCNZi7ekAqGSxhyw	tesla@email.com	5	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 1235 Princes Highway, Heathmere, Victoria, Australia	2017-07-24 03:00:59.398821	2017-07-24 03:00:59.947514	\N	62
372	PIrx4FprG5jL7bkXL06Q2hCeizPShAAg	tesla@email.com	5	User	TradyMailer#request_quote_email	A request for a quote on a job	2017-07-19 18:52:18.613325	2017-07-19 18:52:21.467184	2017-07-19 18:52:36.178828	61
374	S4HOHoAQgGCNV3RxXHiTGAYBrlLRUEEG	rita@email.com	5	User	TenantMailer#alternative_appointment_picked_email	New Appointment Time Requested	2017-07-19 18:56:46.017853	2017-07-19 18:56:46.963255	2017-07-19 18:57:37.90219	61
387	H7go7lLWLP8yFVpPetjwh7dUAu9DuhSZ	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 20:15:51.730751	2017-07-25 20:15:52.505283	2017-07-25 20:47:48.450859	65
381	AUKyA4p64HkcRrTht680rlIxXk7eanlC	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 345 Princes Highway, Woonona, New South Wales, Australia	2017-07-25 16:05:16.160166	2017-07-25 16:05:17.347719	\N	64
388	JvkE4gd5pOTuzNV3KrpEOHLl5chgY0E3	bernard@email.com	6	User	LandlordMailer#send_landlord_maintenance_request	Landlord instructions required - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 20:47:13.679932	2017-07-25 20:47:15.410553	2017-07-25 20:49:36.686407	65
380	ZXmO6QoYFRCKMHEJtODijyjuGZCgxbPD	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 345 Princes Highway, Woonona, New South Wales, Australia	2017-07-25 16:05:15.807546	2017-07-25 16:05:20.522433	2017-07-25 16:05:34.92797	64
384	bXJ45k3JotN6VK9V7zqfIvpUQ7Da3t2W	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 345 Princes Highway, Woonona, New South Wales, Australia	2017-07-25 16:08:07.728683	2017-07-25 16:08:09.899515	\N	\N
383	A0hkxsNtKlHLTs9fN1jH91UwQfiyyWcN	handyman@email.com	4	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 345 Princes Highway, Woonona, New South Wales, Australia	2017-07-25 16:08:07.013523	2017-07-25 16:08:07.724847	2017-07-25 16:08:17.250066	64
386	QSHbVZiPUbGhvstbHDuEZV7QPeq1u8jR	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 20:15:51.525287	2017-07-25 20:15:52.357179	2017-07-25 20:18:31.057974	65
385	REil8qkI2qx4aJX6pB4JsR8QZAaZS1n9	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Quote recieved from Handy man - @property.property_address	2017-07-25 16:09:10.648464	2017-07-25 16:09:11.625495	\N	64
392	lzkZA8T3LNmYCuHdGTkOQ5WaXnhqyK7S	bernard@email.com	6	User	LandlordMailer#send_landlord_maintenance_request	Landlord instructions required - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 20:56:38.402336	2017-07-25 20:56:39.553266	2017-07-25 20:56:41.696779	65
390	gjFqSXahAnZmcL6nCDP97aDtycUHBpzb	bernard@email.com	6	User	LandlordMailer#notify_landlord_about_message	Message received from Leaders inc - 456 Princes Highway, Rockdale, New South Wales, Australia 	2017-07-25 20:55:35.680341	2017-07-25 20:55:37.1863	\N	\N
391	J56kNWkQqPAAnMHsQcQBGkx1rSsOoSfn	bernard@email.com	6	User	LandlordMailer#notify_landlord_about_message	Message received from Leaders inc - 456 Princes Highway, Rockdale, New South Wales, Australia 	2017-07-25 20:56:10.335198	2017-07-25 20:56:11.700116	\N	\N
395	do3iJUUt6icAPSloMQww7jG95cxilUHP	handyman@email.com	4	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 21:13:22.3288	2017-07-25 21:13:24.201501	2017-07-25 21:54:05.275914	65
393	TlZ301E3hd1XeI1itqTiloV9ELTD4gzc	martin@maintenanceapp.com.au	2	User	AgentMailer#request_quote_email	Quote requested by landlord Bernard - @property.property_address	2017-07-25 21:00:32.456491	2017-07-25 21:00:33.280789	\N	65
394	SJpnbmN10hSzVZfU5rEAcORU2ytZ0r4g	martin@maintenanceapp.com.au	2	User	AgentMailer#request_quote_email	Quote requested by landlord Bernard - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 21:03:48.417565	2017-07-25 21:03:49.80526	\N	65
414	MLhD75XphJmrZ4H03YAc7TPLiFw83Itb	bernard@email.com	6	User	LandlordMailer#send_landlord_quote	Quote received - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 23:29:17.31029	\N	\N	65
396	aj8mFdv8rumDGULjmoq92uh0zOWeGpUv	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 21:13:22.94972	2017-07-25 21:13:23.610879	\N	\N
405	5C2FP6VYGj4qPvAUG0MLW9Lf2AAKxEND	rita@email.com	3	User	TenantMailer#trady_declined_appointment_email	Appointment declined by Handy man - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 22:20:11.5381	2017-07-25 22:20:12.559419	\N	\N
404	0jgEucOxhYfCR0Pq8YsWcWtqmX6TpVml	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New appointment request by Handy man - 456 princes highway, rockdale, new south wales, australia	2017-07-25 22:20:10.689197	2017-07-25 22:20:11.45399	2017-07-25 22:38:02.408983	65
398	2bXRl7wVxoG7Z2p8veDdtZGAkcHoSnDj	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 21:17:02.739691	2017-07-25 21:17:03.751519	\N	\N
397	fG1HKL7nylaSEUynhhRbbvRosmalJWjF	tesla@email.com	5	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 21:17:02.021175	2017-07-25 21:17:04.044339	\N	65
399	XJ7lpRH3GRo8NySU9s6tev1SyKHVludt	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New appointment request by Handy man - 456 princes highway, rockdale, new south wales, australia	2017-07-25 21:56:26.150963	2017-07-25 21:56:28.063637	\N	65
400	wLmBgwLpASt4mx4vOCfX8WfHd2zKG1VI	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New appointment request by Handy man - 456 princes highway, rockdale, new south wales, australia	2017-07-25 22:04:37.37633	2017-07-25 22:04:39.412654	\N	65
410	3R4DDXLNH02hm5mJltTU8ISfCN7WptJV	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_trady_quote_message	Quote comment from trady Handy man - 456 Princes Highway, Rockdale, New South Wales, Australia.	2017-07-25 23:14:11.832903	2017-07-25 23:14:12.454434	2017-07-25 23:15:12.729604	\N
401	bzai38Ag8xf51IoV2TIdQdBTtL8qR0dR	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New appointment request by Handy man - 456 princes highway, rockdale, new south wales, australia	2017-07-25 22:06:37.203339	2017-07-25 22:06:38.902322	2017-07-25 22:11:59.048535	65
407	8yQPIN7KUL9Q1gyajZHsnUYzRZZods2q	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_tenant_message	New message from tenant Rita - 456 Princes Highway, Rockdale, New South Wales, Australia.	2017-07-25 22:39:06.279121	2017-07-25 22:39:07.586059	\N	\N
403	dosl5xRjbvMRNfcnT2q6EEjx5gc3cT1Y	handyman@email.com	4	User	TradyMailer#tenant_declined_appointment_email	Appointment Declined	2017-07-25 22:17:17.94057	2017-07-25 22:17:18.638443	\N	\N
406	mPSaJQ1yeBaFQbvgzhhaY3gvLdyUrvfM	handyman@email.com	4	User	TradyMailer#appointment_accepted_email	Appointment confirmed by tenant Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 22:38:30.239563	2017-07-25 22:38:31.479578	2017-07-25 22:47:34.105684	65
402	dBI9I9prYWFcsxNJGCJssE3TaxUq4W6t	handyman@email.com	4	User	TradyMailer#alternative_appointment_picked_email	 New appointment request by tenant Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 22:17:17.357749	2017-07-25 22:17:19.494953	2017-07-25 22:19:46.067232	65
415	AClk2YEIPiFcICQvzo1jsnIc0bDOVaFj	bernard@email.com	6	User	LandlordMailer#send_landlord_quote	Quote received - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 23:29:34.142148	\N	\N	65
408	N47dJUzumeqnHHRQExHx1MCY2nPrwf2C	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Quote recieved from Handy man - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 23:05:37.153611	2017-07-25 23:05:39.30148	2017-07-25 23:10:04.848111	65
416	GdzWSl529OwPDwZRCFaISngcZD8m3TWy	bernard@email.com	6	User	LandlordMailer#send_landlord_quote	Quote received - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 23:31:23.133708	\N	\N	65
412	WaFzwGctdULVBOIgbwTr2hMVm8caDfKR	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 23:15:50.44303	2017-07-25 23:15:51.893454	\N	\N
409	OptewSfctpi6FismU77XwCX9uZA2crTp	handyman@email.com	4	User	TradyMailer#notify_trady_about_quote_message	Question about quote from Leaders inc - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 23:12:03.163127	2017-07-25 23:12:05.0742	2017-07-25 23:12:33.227282	\N
411	yhxdr56tUFYQ4xIuNRb45DLmu2Oc6dDN	electro@email.com	10	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 23:15:49.654169	2017-07-25 23:15:50.717432	2017-07-25 23:16:00.075437	65
417	GwdMUJxN7FasZFaQUmlW9Txeeza2YPtU	bernard@email.com	6	User	LandlordMailer#send_landlord_quote	Quote received - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 23:33:27.636715	\N	\N	65
413	sEpighyJWSgg9D9VIPJUWVjCpaMuiSxr	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Quote recieved from Electro - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 23:20:25.776171	2017-07-25 23:20:27.430079	2017-07-25 23:20:34.103639	65
418	Oz0zieoAycvR1WNSoMk6xzTncpjgVg4y	bernard@email.com	6	User	LandlordMailer#send_landlord_quote	Quote received - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 23:38:39.334756	\N	\N	65
420	oxN1I7ind3bxlcasP8eN9EBxWfDWIDOD	handyman@email.com	4	User	TradyMailer#approved_quote_email	Work Order from Leaders inc- 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 23:58:08.62846	2017-07-25 23:58:09.293319	2017-07-26 00:11:00.286425	65
419	DeYlqUAj3xxPYvGQa9Dv49dyCsAzDpC6	bernard@email.com	6	User	LandlordMailer#send_landlord_quote	Quote received - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 23:44:10.88781	2017-07-25 23:44:12.501785	2017-07-25 23:44:20.056125	65
423	noKotJnYljebEJMiUmlxnf0x9BrMNCkU	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New appointment request by Handy man - 456 princes highway, rockdale, new south wales, australia	2017-07-26 00:13:47.076173	2017-07-26 00:13:48.844236	2017-07-26 00:15:45.222661	65
422	InR27qFsXJ1akTPk3ga4ySoUZy8VITI7	rita@email.com	3	User	TenantMailer#tenant_quote_approved_notification_email	Quote Approved by landlord, Bernard - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-25 23:58:10.691471	2017-07-25 23:58:11.603523	\N	\N
421	bcNq2tyGIe1QUlWF9BjiezNLPNjkwGZi	martin@maintenanceapp.com.au	2	User	AgentMailer#quote_has_been_approved_email	Quote approved by landlord Bernard - 456 Princes Highway, Rockdale, New South Wales, Australia.	2017-07-25 23:58:09.397904	2017-07-25 23:58:13.16588	\N	\N
424	EcitirLOCHOhKTW88wPEH7NQo2SSzspt	handyman@email.com	4	User	TradyMailer#alternative_appointment_picked_email	 New appointment request by tenant Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-26 00:16:22.903543	2017-07-26 00:16:24.77636	2017-07-26 00:17:52.315863	65
425	RDdNCeTW58Nys8Ol9IkE3nRq2awSfBCs	handyman@email.com	4	User	TradyMailer#tenant_declined_appointment_email	Appointment Declined	2017-07-26 00:16:23.64655	2017-07-26 00:16:24.308418	\N	\N
440	YuHWzOPVOJSOFSInm5rwe9AmfQdQlX6l	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 599 Princes Highway, Heathmere, Victoria, Australia	2017-07-26 00:56:33.047357	2017-07-26 00:56:37.274106	\N	68
426	tGxRd4rIuL2wcbEcJcbDM9ZKUgM3BHFE	rita@email.com	3	User	TenantMailer#appointment_accepted_email	Appointment confirmed by Handy man - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-26 00:19:29.510713	2017-07-26 00:19:31.178897	\N	65
434	wZL1fBUMYPVyMtaLeVaFZ48G1UctQHM6	rita@emial.com	15	User	UserMailer#set_password_email	Password setup for - maintenanceapp	2017-07-26 00:34:22.586518	2017-07-26 00:34:23.861312	\N	\N
427	BtxokRaIEpiw2K86RnTM43c6aw7jaMFu	bernard@email.com	6	User	LandlordMailer#quote_has_been_approved_email	Work order sent by Leaders inc - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-26 00:23:46.152625	2017-07-26 00:23:47.412192	\N	\N
435	cSf4icTRtbHQmrElonvywgUsB3kEfqNR	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 4893 James Craig Road, Rozelle, New South Wales, Australia	2017-07-26 00:34:23.407361	2017-07-26 00:34:24.527398	\N	66
436	7Pg7QHXITbpFEtHk7qVORb1ezHybtmAv	rita@emial.com	15	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 4893 James Craig Road, Rozelle, New South Wales, Australia	2017-07-26 00:34:23.663736	2017-07-26 00:34:24.893715	\N	66
429	rUmD5KYyXoC7bx7PyYwhsYT9eZ9ZaKSK	rita@email.com	3	User	TenantMailer#trady_cancelled_appointment_email	Cancelled appointment by Handy man - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-26 00:27:20.515153	2017-07-26 00:27:21.259543	\N	\N
428	UO3TeCOXdLQ6MgPQOm1p6hNdzDN5KPYF	rita@email.com	4	User	TenantMailer#alternative_appointment_picked_email	New appointment request by Handy man - 456 princes highway, rockdale, new south wales, australia	2017-07-26 00:27:19.896298	2017-07-26 00:27:21.043439	2017-07-26 00:27:32.026739	65
437	WFrbhviiHrSEqtwBedZUSglBPy0wCDRT	handyman@email.com	4	User	TradyMailer#work_order_email	Work Order from Leaders inc- 4893 James Craig Road, Rozelle, New South Wales, Australia ()	2017-07-26 00:37:12.051092	2017-07-26 00:37:13.436074	2017-07-26 00:57:08.834329	66
430	wjFPKJsamwJjl1RxNcrJYg0UUChmZzTG	handyman@email.com	4	User	TradyMailer#appointment_accepted_email	Appointment confirmed by tenant Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-26 00:27:55.538378	2017-07-26 00:27:56.567405	\N	65
431	gNyaAVmKY7hudORd57KwlLBr2NoexLQL	handyman@email.com	4	User	TradyMailer#alternative_appointment_picked_email	 New appointment request by tenant Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-26 00:28:30.466333	2017-07-26 00:28:31.687261	\N	65
432	BV0oC3mLjzQVin1Lri4wYzzSeLbZ42Kf	handyman@email.com	4	User	TradyMailer#tenant_cancelled_appointment_email	Cancelled appointment by tenant - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-26 00:30:55.095826	2017-07-26 00:30:56.62582	\N	\N
433	n5QzXT1HtdM9B16xhkqabRqC7XyqLcfw	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_tenant_message	New message from tenant Rita - 456 Princes Highway, Rockdale, New South Wales, Australia.	2017-07-26 00:32:31.961733	2017-07-26 00:32:32.50122	2017-07-26 00:32:42.000792	\N
445	SnDVwAV9PbCDJqrt0m3f1bAJ1lBsV5OS	romina@email.com	18	User	UserMailer#set_password_email	Password setup for - maintenanceapp	2017-07-27 04:26:00.442042	2017-07-27 04:26:02.67188	2017-07-27 04:26:14.574239	\N
438	GCBe6qpCF760K1HFVzgCdSuOTtBFSqnP	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 567 George Street, Sydney, New South Wales, Australia	2017-07-26 00:49:47.824167	2017-07-26 00:49:49.128424	\N	67
439	RVjiSuoeHzbuuEDir7RahBaeBDZLPclS	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 567 George Street, Sydney, New South Wales, Australia	2017-07-26 00:49:48.073635	2017-07-26 00:49:49.640446	\N	67
441	CP9AtvqkWU2UZP4U1b7d0Il3dLP1EYuW	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 599 Princes Highway, Heathmere, Victoria, Australia	2017-07-26 00:56:33.313142	2017-07-26 00:56:34.965163	\N	68
449	aHvOqKOtii1cE3Edx2WewABm8acSvSaG	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 123 Princes Highway, Port Fairy, Victoria, Australia	2017-07-28 07:45:44.61933	2017-07-28 07:45:46.670224	\N	71
443	AHIq6zLCqsnlQYbLB0amj6WxLtA5H5R5	west@email.com	16	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-26 06:05:21.257411	2017-07-26 06:05:27.731163	\N	69
444	lIMp7sRbbHnXvfF3dtGrP2CvvddOvckw	west@email.com	16	User	UserMailer#set_password_email	Password setup for - maintenanceapp	2017-07-26 06:05:22.441083	2017-07-26 06:05:24.227694	2017-07-26 06:13:35.917017	\N
442	RXZgBEoTJ49klF2mKLDng7RHnxOq2xbV	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Kanye - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-26 06:05:20.97571	2017-07-26 06:05:23.559852	2017-07-26 06:14:04.910658	69
446	7Dw5dADhVPusudE6hpv58SNfgYQQ4UGJ	romina@email.com	18	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 234 Collins Street, Melbourne, Victoria, Australia	2017-07-27 04:27:45.143648	2017-07-27 04:27:46.315166	\N	70
447	qGb45YXyyOi8reHZrPGD0ua2aGg4yDbQ	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 234 Collins Street, Melbourne, Victoria, Australia	2017-07-27 04:27:45.375365	2017-07-27 04:27:46.518106	\N	70
448	zPvvx5Hr0cUD8cWElA4vzsrZllOkOKtL	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 123 Princes Highway, Port Fairy, Victoria, Australia	2017-07-28 07:45:43.980659	2017-07-28 07:45:50.63559	\N	71
450	ifiSaEozasifrUDGfVVII0PY8GzplXWC	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-31 05:34:00.634681	2017-07-31 05:34:01.739103	\N	74
451	9eNS9dQq8QRBUDUG4iAp55afJioYprey	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-31 05:34:00.832378	2017-07-31 05:34:02.079518	\N	74
452	1ybtVrGSlXQZXQxFL5PQmwMrbFtFL8jc	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-31 20:59:25.337978	2017-07-31 20:59:29.244299	\N	75
453	mGGpBfdoewiTuXulOT0DngQE3i86QEHW	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-31 20:59:25.527201	2017-07-31 20:59:26.47568	\N	75
454	T2IP5XgyfMrEHdNJV67gpcMyrRysynWv	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-31 21:00:08.152232	2017-07-31 21:00:09.342213	\N	75
473	HJuL2fu73ekaPwpB6C2ukUVjBFKjQC0l	rita@emial.com	4	User	TenantMailer#alternative_appointment_picked_email	New appointment request by Handy man - 4893 james craig road, rozelle, new south wales, australia	2017-08-07 04:57:29.216478	2017-08-07 04:57:29.724621	\N	66
455	tk0zFSW2FRPVoha7pS3nyIK0h6FZ4xCM	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-31 21:00:08.321599	2017-07-31 21:00:09.024347	\N	75
464	6gZGVeGWyTVDYi6Z4L5aos5BDi5fWPU5	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_landlord_message	New message from landlord Bernard - 456 Princes Highway, Rockdale, New South Wales, Australia.	2017-08-02 00:16:06.052842	2017-08-02 00:16:06.498486	\N	\N
457	Lm3dbFoASxmuKGt3q1JcEwRF5tKUdUv5	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-31 21:01:21.983154	2017-07-31 21:01:22.730319	\N	75
456	PqmY1TGX6XbDa1r8dlqcIbuhH60xXnwk	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-31 21:01:21.819196	2017-07-31 21:01:23.881509	\N	75
465	VAtdifKHAEnfayUJBmUy6nyYpGZeXgIS	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_landlord_message	New message from landlord Bernard - 456 Princes Highway, Rockdale, New South Wales, Australia.	2017-08-02 00:17:42.941958	2017-08-02 00:17:43.387916	\N	\N
459	v6KUmVSYuZ9ZsDZtayScgjlLLEbC47kd	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-31 21:02:04.186918	2017-07-31 21:02:04.855778	\N	75
458	BCmKl4g0DJxZoUhVGOxbc2iUoVNfa4nA	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-31 21:02:04.027569	2017-07-31 21:02:06.505819	\N	75
461	tmwLkH6KpwKRih4xPiIdydswbiBgzMtf	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-31 21:05:22.307497	2017-07-31 21:05:22.962486	\N	75
460	sUHBPkz1cUedAp3XCrjaPvQ7fkkPbV92	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-07-31 21:05:22.171101	2017-07-31 21:05:23.271703	\N	75
466	p2OSk36A64jhNjrHk8mwhaDwL800IzSF	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_landlord_message	New message from landlord Bernard - 456 Princes Highway, Rockdale, New South Wales, Australia.	2017-08-02 00:19:41.831179	2017-08-02 00:19:42.277817	\N	\N
462	zS2hqUODr4nwWQekDgstATxFl60v3A2b	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_landlord_message	New message from landlord Bernard - 456 Princes Highway, Rockdale, New South Wales, Australia.	2017-08-01 23:38:33.894476	2017-08-01 23:38:34.584614	\N	\N
463	UWNhxbFGIZEnIiKneU4f0WmWoenyYUkg	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_landlord_message	New message from landlord Bernard - 456 Princes Highway, Rockdale, New South Wales, Australia.	2017-08-02 00:14:27.885068	2017-08-02 00:14:28.407629	\N	\N
479	h5TScxEreA7pg6CB3mdQq9FhPv9JiWH9	bernard@email.com	6	User	LandlordMailer#send_landlord_maintenance_request	Landlord instructions required - 987 Logan Road, Holland Park West, Queensland, Australia	2017-08-07 08:48:39.003476	2017-08-07 08:48:39.506134	\N	78
467	5Jqe16e6e2zb2sGTnlZllKafLZLnru9p	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_landlord_message	New message from landlord Bernard - 456 Princes Highway, Rockdale, New South Wales, Australia.	2017-08-02 00:23:16.724247	2017-08-02 00:23:17.887737	\N	\N
471	942nVoZQcKwiVekxBNTVYf0rG28YYf9s	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-07 02:58:30.572212	2017-08-07 02:58:31.49213	\N	77
470	vwpUqS1yzGb1tH8oXdMX6jQNm05dV1Uw	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-07 02:58:30.254137	2017-08-07 02:58:31.040352	2017-08-07 02:58:37.916129	77
468	V1hayzZDH0sZWSvAevlZzhXsBOBVXdvM	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-07 02:42:07.303266	2017-08-07 02:42:08.372405	\N	76
469	yfWI8QET27G09SEuBT1BVM2kwhnKgbPQ	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-07 02:42:07.681691	2017-08-07 02:42:08.391796	\N	76
472	EFic5gppLUyxqQXQnwjKR0zPC6VEJCoF	rita@emial.com	4	User	TenantMailer#alternative_appointment_picked_email	New appointment request by Handy man - 4893 james craig road, rozelle, new south wales, australia	2017-08-07 04:55:04.315731	2017-08-07 04:55:04.842175	\N	66
478	0k292zgXcYlOsLLLecwXpEgpSC1b9Myb	americo@email.com	19	User	LandlordMailer#send_landlord_maintenance_request	Landlord instructions required - 987 Logan Road, Holland Park West, Queensland, Australia	2017-08-07 08:45:26.274851	2017-08-07 08:45:26.781683	\N	78
474	5FzHWlbVpgPs6Hh4VolMpCynWdGgepCf	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 987 Logan Road, Holland Park West, Queensland, Australia	2017-08-07 08:20:36.082969	2017-08-07 08:20:36.908559	\N	78
475	UA9p97rElwIUMMXhDgheDgKL92G9wyIo	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 987 Logan Road, Holland Park West, Queensland, Australia	2017-08-07 08:20:36.347203	2017-08-07 08:20:37.270544	\N	78
476	hXWDU3KMaQMRpvkiBx2fvwcswJPKyMaY	americo@email.com	19	User	LandlordMailer#send_landlord_maintenance_request	Landlord instructions required - 987 Logan Road, Holland Park West, Queensland, Australia	2017-08-07 08:24:01.286628	2017-08-07 08:24:01.864593	\N	78
477	OvaAu2sJUhzWUfQIkfPKw78cgpqYGXBz	americo@email.com	19	User	UserMailer#set_password_email	Password setup for - maintenanceapp	2017-08-07 08:24:01.656781	2017-08-07 08:24:02.182	\N	\N
480	Riu3xJMiq6qE2D5XrrUcHXyKrlV94KdA	americo@email.com	19	User	LandlordMailer#send_landlord_maintenance_request	Landlord instructions required - 987 Logan Road, Holland Park West, Queensland, Australia	2017-08-07 08:50:18.629274	2017-08-07 08:50:19.123366	\N	78
481	o093NaAA46CSrWMNKWiN8ZAtS9zdWeSx	americo@email.com	19	User	LandlordMailer#send_landlord_maintenance_request	Landlord instructions required - 987 Logan Road, Holland Park West, Queensland, Australia	2017-08-07 09:11:50.025058	2017-08-07 09:11:50.555266	\N	78
482	QrJIdBnxBGe6Y5L6QPqKtcF6PX2PlMi6	americo@email.com	19	User	LandlordMailer#send_landlord_maintenance_request	Landlord instructions required - 987 Logan Road, Holland Park West, Queensland, Australia	2017-08-07 09:20:21.579519	2017-08-07 09:20:22.107082	\N	78
540	SlJWn19XJx6fYop5X60680U394kSrgjc	tesla@email.com	5	User	TradyMailer#tenant_declined_appointment_email	Appointment Declined	2017-08-08 23:52:19.910822	2017-08-08 23:52:20.430897	\N	\N
483	S4pK9o3iWM0FnvvznsRjQpsPE4XDgb5p	americo@email.com	19	User	LandlordMailer#send_landlord_maintenance_request	Landlord instructions required - 987 Logan Road, Holland Park West, Queensland, Australia	2017-08-08 01:51:50.624442	2017-08-08 01:51:51.134966	\N	78
509	vxmXvNOw0SxY6w0UpLbfNOJxUh2ymLOn	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_trady_message	New message from trady Handy man - 4893 James Craig Road, Rozelle, New South Wales, Australia.	2017-08-08 06:58:03.76095	2017-08-08 06:58:04.405527	2017-08-08 07:08:55.972679	\N
484	xftmTv4eWPUn4ieNfq7TlJ2a9TIEosOn	americo@email.com	19	User	LandlordMailer#send_landlord_maintenance_request	Landlord instructions required - 987 Logan Road, Holland Park West, Queensland, Australia	2017-08-08 02:08:24.066836	2017-08-08 02:08:24.665819	\N	78
500	FXozqgReKltwSu3nn2vOckNMeY80kRQC	bernard@email.com	6	User	LandlordMailer#send_landlord_maintenance_request	Landlord instructions required - 987 Pacific Highway, Pymble, New South Wales, Australia	2017-08-08 05:33:54.55366	2017-08-08 05:33:55.092833	2017-08-08 05:34:52.54858	80
485	VEdNOhJeug04z7E0MeHnd2juEHyF5Ak9	rita@emial.com	4	User	TenantMailer#alternative_appointment_picked_email	New appointment request by Handy man - 4893 james craig road, rozelle, new south wales, australia	2017-08-08 04:43:52.593525	2017-08-08 04:43:53.059352	\N	66
492	kOA5HjyVxSEZw2mzuGaT9qLTfNN4SUXg	rita@email.com	3	User	ApplicationMailer#tenant_message_notify_email	Message received from Leaders inc - 987 Pacific Highway, Pymble, New South Wales, Australia	2017-08-08 05:11:53.154462	2017-08-08 05:11:53.660815	2017-08-08 05:12:39.819863	\N
486	I7yizt2QXJ38BUcw9fDD49LJ9X4FNAJ6	rita@emial.com	4	User	TenantMailer#alternative_appointment_picked_email	New appointment request by Handy man - 4893 james craig road, rozelle, new south wales, australia	2017-08-08 04:45:10.581759	2017-08-08 04:45:11.185133	\N	66
487	wKcUx93y57zm3yDqN1373vE9EIsPPvnZ	martin@maintenanceapp.com.au	2	User	AgentMailer#send_maintenance_request_invoice	Invoice recieved from Handy man - 4893 James Craig Road, Rozelle, New South Wales, Australia	2017-08-08 04:50:51.135304	2017-08-08 04:50:51.764221	\N	66
497	CaaWBuJSNKkzOKIDbTCwmMzmDh4WyYkd	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_tenant_message	New message from tenant Rita - 987 Pacific Highway, Pymble, New South Wales, Australia.	2017-08-08 05:26:15.099976	2017-08-08 05:26:15.600498	2017-08-08 05:26:37.369715	\N
493	quS4K0fwWj5LVIOvw9DRqED240gs6MMs	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_tenant_message	New message from tenant Rita - 987 Pacific Highway, Pymble, New South Wales, Australia.	2017-08-08 05:13:15.20466	2017-08-08 05:13:15.646489	\N	\N
488	6TAamYxoz2pkutxRX7PoHLFM4w0Fprnw	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 567 Chapel Street, South Yarra, Victoria, Australia	2017-08-08 05:00:22.433631	2017-08-08 05:00:23.240627	\N	79
489	FVtvzQcYbT7FgbCerY5Cm3S08FCdGLyF	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 567 Chapel Street, South Yarra, Victoria, Australia	2017-08-08 05:00:22.687607	2017-08-08 05:00:23.678941	\N	79
491	0ADIw7MQbylgS3MqOdkfhcvzzS4yWzJq	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 987 Pacific Highway, Pymble, New South Wales, Australia	2017-08-08 05:10:09.833503	2017-08-08 05:10:10.938158	2017-08-08 05:15:33.25948	80
490	uopoIA3SOnqS7noeAjDYoMBHHKngUq89	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 987 Pacific Highway, Pymble, New South Wales, Australia	2017-08-08 05:10:09.581974	2017-08-08 05:10:10.415887	2017-08-08 05:10:45.69088	80
503	8np531FrumVf5cbzza6XUiE0CwM4GAv1	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	 New appointment request by landlord, Bernard - @property.property_address	2017-08-08 05:39:51.612053	2017-08-08 05:39:52.099982	2017-08-08 05:40:20.571386	80
494	rHesnuK55jVvn9bcHipsr7lZ77xTlU32	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_tenant_message	New message from tenant Rita - 987 Pacific Highway, Pymble, New South Wales, Australia.	2017-08-08 05:17:53.349006	2017-08-08 05:17:53.852143	2017-08-08 05:20:27.024898	\N
498	f5N4qQDR2hTtx5gFFV0u8cUvomthC4xL	rita@email.com	3	User	ApplicationMailer#tenant_message_notify_email	Message received from Leaders inc - 987 Pacific Highway, Pymble, New South Wales, Australia	2017-08-08 05:27:14.666755	2017-08-08 05:27:15.108648	2017-08-08 05:27:31.047346	\N
495	53C1erCFVAhfztowzfKD9tfup362voOR	rita@email.com	3	User	ApplicationMailer#tenant_message_notify_email	Message received from Leaders inc - 987 Pacific Highway, Pymble, New South Wales, Australia	2017-08-08 05:25:30.114149	2017-08-08 05:25:30.660092	2017-08-08 05:25:42.712648	\N
501	ofFscGXrMV2TJ08QIiEtbtOjcHxzsB55	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_landlord_message	New message from landlord Bernard - 987 Pacific Highway, Pymble, New South Wales, Australia.	2017-08-08 05:36:19.979837	2017-08-08 05:36:20.460499	\N	\N
496	jNHNDZaCBdSODxNyYHZducPyN6GgsQaW	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_tenant_message	New message from tenant Rita - 987 Pacific Highway, Pymble, New South Wales, Australia.	2017-08-08 05:25:53.647665	2017-08-08 05:25:54.15152	\N	\N
499	mmC8euvY8c2EkQ80rTpvcAhz0tP7e63U	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_tenant_message	New message from tenant Rita - 987 Pacific Highway, Pymble, New South Wales, Australia.	2017-08-08 05:27:53.995862	2017-08-08 05:27:54.486405	2017-08-08 05:29:02.428893	\N
502	GUYqUlWPe1SW18XYovU4l3UORlSaHnRv	martin@maintenanceapp.com.au	2	User	AgentMailer#request_quote_email	Quote requested by landlord Bernard - 987 Pacific Highway, Pymble, New South Wales, Australia	2017-08-08 05:36:46.370945	2017-08-08 05:36:46.883129	2017-08-08 05:57:56.543626	80
506	OS4f2kpmhaVLAUNnE7CuTsYNTs46OlfW	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_tenant_message	New message from tenant Rita - 987 Pacific Highway, Pymble, New South Wales, Australia.	2017-08-08 06:29:46.124202	2017-08-08 06:29:46.62802	2017-08-08 06:30:33.711647	\N
505	3OEGcaXfDC0l0FvFamJxdxOyUtmamnAe	rita@email.com	3	User	ApplicationMailer#tenant_message_notify_email	Message received from Leaders inc - 987 Pacific Highway, Pymble, New South Wales, Australia	2017-08-08 06:29:00.213163	2017-08-08 06:29:00.693531	2017-08-08 06:29:34.712658	\N
504	oNX4ZoxK5MaJieLT7oYE0crZUkSNobLn	rita@email.com	3	User	ApplicationMailer#tenant_message_notify_email	Message received from Leaders inc - 987 Pacific Highway, Pymble, New South Wales, Australia	2017-08-08 06:27:24.868893	2017-08-08 06:27:25.500307	\N	\N
507	6i6hQW24XpRlXQYHyuwhc149uCa3ZmsI	rita@emial.com	4	User	TenantMailer#alternative_appointment_picked_email	New appointment request by Handy man - 4893 james craig road, rozelle, new south wales, australia	2017-08-08 06:39:36.027548	2017-08-08 06:39:36.608769	\N	66
508	JIN5eBRYUUFlTfy7Z7L8JrCageODD7B0	rita@emial.com	4	User	TenantMailer#alternative_appointment_picked_email	New appointment request by Handy man - 4893 james craig road, rozelle, new south wales, australia	2017-08-08 06:56:43.401023	2017-08-08 06:56:43.967671	\N	66
510	T12PSDoQHFaal5smweFa0zKCCYZd681k	rita@emial.com	4	User	TenantMailer#alternative_appointment_picked_email	New appointment request by Handy man - 4893 james craig road, rozelle, new south wales, australia	2017-08-08 07:06:15.625559	2017-08-08 07:06:16.244748	\N	66
531	KW4x1ayzFuyPIkPcH9KeP0Fztj1hajTW	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_landlord_message	New message from landlord Americo - 1234 Princes Highway, Heathmere, Victoria, Australia.	2017-08-08 23:47:05.180572	2017-08-08 23:47:05.684147	\N	\N
511	Nei46HE40YBSIeSwrUZcmVsRSGawmKFL	handyman@email.com	4	User	TradyMailer#notify_picked_trady_about_message	Message received from Leaders inc - 4893 James Craig Road, Rozelle, New South Wales, Australia	2017-08-08 07:09:06.834038	2017-08-08 07:09:07.3864	2017-08-08 07:09:42.874414	\N
529	sD6D5N49oreU9GTjBGscian88CsqbcPY	rita@email.com	3	User	ApplicationMailer#tenant_message_notify_email	Message received from Leaders inc - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-08 23:45:05.159825	2017-08-08 23:45:05.670094	\N	\N
520	xuFC8Z3ptP3J2AkCZagTshKdYOmaZtA8	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 987 Pacific Highway, Pymble, New South Wales, Australia	2017-08-08 07:47:00.865031	2017-08-08 07:47:01.418108	\N	\N
519	yaDvMa0k4xNoKXSpdsk6pz66NNtVUngo	electro@email.com	10	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 987 Pacific Highway, Pymble, New South Wales, Australia	2017-08-08 07:47:00.270251	2017-08-08 07:47:00.837302	2017-08-08 07:47:28.997107	80
514	bOtRYhvsNnDjczFK6o0rB8EDyWayuhoO	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_landlord_message	New message from landlord Bernard - 987 Pacific Highway, Pymble, New South Wales, Australia.	2017-08-08 07:42:22.004667	2017-08-08 07:42:22.545651	\N	\N
512	Uw0C9Mqi01rmImUQclc12O4gUwin36vg	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	 New appointment request by landlord, Bernard - @property.property_address	2017-08-08 07:41:25.028232	2017-08-08 07:41:25.536297	2017-08-08 07:42:37.148818	80
525	ydu3bpBVRCBfDSzWqYXpDLRi0GqrsyeD	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-08 23:31:52.763297	2017-08-08 23:31:53.515259	2017-08-08 23:45:29.86769	81
516	IR6cTvy16GQg1LD5rRSjBn4mWQ8x6vi0	bernard@email.com	6	User	LandlordMailer#tenant_declined_landlord_appointment_email	Appointment declined by tenant Rita - 987 Pacific Highway, Pymble, New South Wales, Australia	2017-08-08 07:43:21.02043	2017-08-08 07:43:21.520318	\N	\N
515	d5hRwAhNkelNTQRH6HlcThrBK9cbTbxN	bernard@email.com	6	User	LandlordMailer#alternative_appointment_picked_email	Change appointment request by tenant Rita- 987 Pacific Highway, Pymble, New South Wales, Australia	2017-08-08 07:43:20.505242	2017-08-08 07:43:21.115966	2017-08-08 07:44:15.276236	80
526	7ni3Dtt9Q67I5BrPkS7XdOQG5iPddFKP	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-08 23:31:53.03302	2017-08-08 23:31:53.976415	2017-08-08 23:32:17.409705	81
522	2rUHTUSCMg2miATcYYvPbKpM2ILzQF6f	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 567 Chapel Street, South Yarra, Victoria, Australia	2017-08-08 08:16:59.16152	2017-08-08 08:16:59.700883	\N	\N
517	TxCC0EKJLmYW0rF2yqKtjEJg4Ebr4zrg	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	 New appointment request by landlord, Bernard - @property.property_address	2017-08-08 07:44:47.005285	2017-08-08 07:44:47.581741	2017-08-08 07:45:11.057946	80
521	5amr7Lze0WZWwYYu7Xr33cN9uhHIXMXH	handyman@email.com	4	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 567 Chapel Street, South Yarra, Victoria, Australia	2017-08-08 08:16:58.548093	2017-08-08 08:16:59.16999	2017-08-08 08:17:12.585205	79
518	t4HUYIKPirGk24G6vPbeX1DwkTBhugoe	bernard@email.com	6	User	LandlordMailer#appointment_accepted_email	Appointment confirmed by tenant Rita- 987 Pacific Highway, Pymble, New South Wales, Australia	2017-08-08 07:45:20.483139	2017-08-08 07:45:20.970894	\N	80
513	OnC0sICxEzv4z1jWmnz0lULgQkKlCwJu	martin@maintenanceapp.com.au	2	User	AgentMailer#request_quote_email	Quote requested by landlord Bernard - 987 Pacific Highway, Pymble, New South Wales, Australia	2017-08-08 07:41:53.840178	2017-08-08 07:41:54.367695	2017-08-08 07:46:34.884509	80
523	yLBLALZKxSsV962ZoUl8Yn1ay0UXFps4	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Quote recieved from Handy man - 4893 James Craig Road, Rozelle, New South Wales, Australia	2017-08-08 08:47:55.064815	2017-08-08 08:47:55.862347	\N	66
524	o1SjRIfsmi3SSNLXPYpUomA1aWpuAexb	martin@maintenanceapp.com.au	2	User	AgentMailer#send_maintenance_request_invoice	Invoice recieved from Handy man - 4893 James Craig Road, Rozelle, New South Wales, Australia	2017-08-08 23:19:11.547393	2017-08-08 23:19:12.321298	\N	66
527	bocxhF69SQRtbXynMIJhjaoVVowC1ba4	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_tenant_message	New message from tenant Rita - 1234 Princes Highway, Heathmere, Victoria, Australia.	2017-08-08 23:44:36.802396	2017-08-08 23:44:37.234411	\N	\N
537	ZFu3iUQaMzhgf4ofOz8lSwy1SpmQ6LFR	rita@email.com	5	User	TenantMailer#alternative_appointment_picked_email	New appointment request by Electric tesla - 1234 princes highway, heathmere, victoria, australia	2017-08-08 23:49:20.600977	2017-08-08 23:49:21.095635	2017-08-08 23:51:46.552629	81
532	KCmXoLnlgNiMOTU2vnqXQfoN7zt804qC	martin@maintenanceapp.com.au	2	User	AgentMailer#request_quote_email	Quote requested by landlord Americo - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-08 23:47:17.556531	2017-08-08 23:47:18.079523	\N	81
528	pL9ToCPJnk8Fa9kxskChF1CdWNyiVdpt	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_tenant_message	New message from tenant Rita - 1234 Princes Highway, Heathmere, Victoria, Australia.	2017-08-08 23:44:46.985305	2017-08-08 23:44:47.465045	2017-08-08 23:44:59.009086	\N
530	kmOQGPbxiusA5ERd9iUU2HAEBlZLAF63	americo@email.com	19	User	LandlordMailer#send_landlord_maintenance_request	Landlord instructions required - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-08 23:46:39.301241	2017-08-08 23:46:39.758527	2017-08-08 23:46:51.927346	81
534	AwSBmn5p47kIoEmh7oiAXTXmKKHdShyb	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-08 23:47:53.979454	2017-08-08 23:47:54.464971	\N	\N
533	6LsmCMn6EaYXl9Ynic0ZgSrylHNWXTlS	handyman@email.com	4	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-08 23:47:53.335032	2017-08-08 23:47:53.892993	\N	81
536	txtiGcnnWq66jEbgLSu44zp5I9tLaHIX	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-08 23:48:29.268669	2017-08-08 23:48:29.800597	\N	\N
539	FiXxbRGZhLGcdbcCDs46IFHNTzCHruxf	tesla@email.com	5	User	TradyMailer#alternative_appointment_picked_email	 New appointment request by tenant Rita - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-08 23:52:19.481439	2017-08-08 23:52:20.057594	2017-08-08 23:53:31.611911	81
535	6W3dmdZZdbKxoMA2YcS198tyMtEm6RgZ	tesla@email.com	5	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-08 23:48:28.591557	2017-08-08 23:48:29.143922	2017-08-08 23:48:44.941011	81
538	phDW5Hf0ddHp2KMIFbXkoenaU1vDV7ck	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Quote recieved from Elon - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-08 23:50:09.868148	2017-08-08 23:50:10.40006	2017-08-08 23:54:10.210456	81
555	jDATth4nxqxa4J8rb0lb97r4N7lt6LvM	rita@email.com	3	User	TenantMailer#tenant_quote_approved_notification_email	Quote Approved by landlord, Americo - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:08:00.986514	2017-08-09 00:08:01.513108	\N	\N
541	hNiB4PEOuijfmDFrTgp44mfomfxIG21J	rita@email.com	3	User	TenantMailer#appointment_accepted_email	Appointment confirmed by Electric tesla - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-08 23:53:45.651805	2017-08-08 23:53:46.109056	\N	81
549	KYRdVgE2hlg3zmrMmrGUD8DP3H6ZL2MU	tesla@email.com	5	User	TradyMailer#notify_trady_about_quote_message	Question about quote from Leaders inc - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:03:30.747128	2017-08-09 00:03:31.220708	2017-08-09 00:03:41.96764	\N
542	wu0dhsWUSwloXM8DXC6JKzgZwrGVwX2P	americo@email.com	19	User	LandlordMailer#send_landlord_quote	Quote received - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-08 23:54:23.875781	2017-08-08 23:54:24.342717	2017-08-08 23:54:40.536457	81
551	odYSXYuXqmTsYOu3UpKGne13NQm8BwjR	electro@email.com	10	User	TradyMailer#notify_trady_about_quote_message	Question about quote from Leaders inc - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:07:52.360946	2017-08-09 00:07:52.832598	2017-08-09 00:10:22.117886	\N
543	YYQyyMWuuJh5xXhDOwzchQreZenMHvW2	martin@maintenanceapp.com.au	2	User	AgentMailer#request_quote_email	Quote requested by landlord Americo - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-08 23:55:03.984043	2017-08-08 23:55:04.470474	\N	81
552	VYJAE4BWQaf3oJ78wp4qSeQCys5CBKvu	tesla@email.com	5	User	TradyMailer#approved_quote_email	Work Order from Leaders inc- 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:07:59.348633	2017-08-09 00:07:59.846891	2017-08-09 00:12:17.902283	81
550	cRFcrNGIViJfiwux4cGBNGr4AWdWdS4S	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_trady_quote_message	Quote comment from trady Elon - 1234 Princes Highway, Heathmere, Victoria, Australia.	2017-08-09 00:04:21.400073	2017-08-09 00:04:21.890899	2017-08-09 00:04:41.812415	\N
545	CSPrnAWzjeM0F7Aq9PaCliQziXbhmc7y	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-08 23:55:29.626938	2017-08-08 23:55:30.107864	\N	\N
558	HjRSoWhIzInL77WrTSdtDVjCo1t2BkZv	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	 New appointment request by landlord, Americo - @property.property_address	2017-08-09 00:19:03.656106	2017-08-09 00:19:04.129806	2017-08-09 00:19:19.704564	81
546	nWVVIPiSXypFgAaImlIH5v8iKrvku78z	tesla@email.com	5	User	TradyMailer#notify_trady_about_quote_message	Question about quote from Leaders inc - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-08 23:55:57.844627	2017-08-08 23:55:58.320948	2017-08-08 23:56:26.39751	\N
547	SpifbRkpDtlCUFGZ5QUqY5Rr404aST5K	martin@maintenanceapp.com.au	2	User	AgentMailer#notify_agent_about_trady_quote_message	Quote comment from trady Elon - 1234 Princes Highway, Heathmere, Victoria, Australia.	2017-08-08 23:56:47.728023	2017-08-08 23:56:48.181195	\N	\N
544	uIYlzQjoWmis4J7Ahb1x87qwmE1sz7NE	electro@email.com	10	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-08 23:55:28.99952	2017-08-08 23:55:29.569659	2017-08-08 23:57:58.100474	81
553	p44CoYrvX5OdtfUUfDCnfP8wXzvJsvMT	martin@maintenanceapp.com.au	2	User	AgentMailer#quote_has_been_approved_email	Quote approved by landlord Americo - 1234 Princes Highway, Heathmere, Victoria, Australia.	2017-08-09 00:07:59.914259	2017-08-09 00:08:00.414101	2017-08-09 00:23:29.272216	\N
548	45TdpFFOisl4oWp5bAILfv62Na6qwU7D	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Quote recieved from Electro - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:01:57.43805	2017-08-09 00:01:58.097808	2017-08-09 00:03:11.533374	81
556	ubCemprVd2McMk8ZLPjBIrHUBOu1wMAP	rita@email.com	5	User	TenantMailer#alternative_appointment_picked_email	New appointment request by Electric tesla - 1234 princes highway, heathmere, victoria, australia	2017-08-09 00:14:01.063905	2017-08-09 00:14:01.504365	2017-08-09 00:16:17.153849	81
568	ztnNsH6lFlpo0Pf4s7uCXINERcLzu7qh	rita@email.com	3	User	TenantMailer#trady_cancelled_appointment_email	Cancelled appointment by Electric tesla - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:25:54.957373	2017-08-09 00:25:55.462157	\N	\N
563	OgOKv9kPrF4AfaDaPR6LeeMJ9J2IuDZt	americo@email.com	19	User	LandlordMailer#appointment_accepted_email	Appointment confirmed by tenant Rita- 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:21:59.022555	2017-08-09 00:21:59.46519	2017-08-09 00:22:25.815729	81
560	n3WLX2ZojKQf3PW7WFR0lg8FiRfTEVa2	americo@email.com	19	User	LandlordMailer#tenant_declined_landlord_appointment_email	Appointment declined by tenant Rita - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:19:38.147479	2017-08-09 00:19:38.617196	\N	\N
557	PutZEIytMk6x8S2zA3XHKd1s9tDJq1Nl	tesla@email.com	5	User	TradyMailer#appointment_accepted_email	Appointment confirmed by tenant Rita - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:17:27.021592	2017-08-09 00:17:27.488576	\N	81
554	ElFO4Odgw3tm0VealociAFx7ZCdlkEoz	americo@email.com	19	User	LandlordMailer#quote_has_been_approved_email	Work order sent by Leaders inc - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:08:00.463258	2017-08-09 00:08:01.008765	2017-08-09 00:18:51.327801	\N
559	wpzbUQN3NJ2l7jAsj72rD4aFLrIOg1So	americo@email.com	19	User	LandlordMailer#alternative_appointment_picked_email	Change appointment request by tenant Rita- 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:19:37.675746	2017-08-09 00:19:38.185849	2017-08-09 00:19:57.268014	81
562	cXfCY7pQh9FXZOOUFy9VRHmQFNm1UV1M	rita@email.com	3	User	TenantMailer#landlord_declined_appointment	Appointment declined by landlord, Americo- 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:20:42.119062	2017-08-09 00:20:42.586555	\N	\N
561	LL3kTi2t23NhlISpa9NYXUuIJPa8Trqx	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	 New appointment request by landlord, Americo - @property.property_address	2017-08-09 00:20:41.539039	2017-08-09 00:20:42.089978	2017-08-09 00:21:50.05918	81
564	NRorRRWshk5DJSZ0RbU1ORzhWvxJeTPl	rita@email.com	3	User	TenantMailer#alternative_landlord_appointment_picked_email	 New appointment request by landlord, Americo - @property.property_address	2017-08-09 00:22:56.457135	2017-08-09 00:22:57.006807	\N	81
565	qhxHVLNmf9fFHHfA2zzvgl192ZlCtNNM	rita@email.com	3	User	TenantMailer#landlord_cancelled_appointment	Cancelled appointment by landlord, Americo- 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:22:56.981715	2017-08-09 00:22:57.505545	\N	\N
566	lzQp9WUYXG5zPTdCsMjkwTRDG6mAnxzB	tesla@email.com	5	User	TradyMailer#notify_trady_about_quote_message	Question about quote from Leaders inc - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:24:13.08833	2017-08-09 00:24:13.623065	2017-08-09 00:24:27.939835	\N
567	J4kGvnEHT2PWCsvOaOHvVW0HjojGCLEC	rita@email.com	5	User	TenantMailer#alternative_appointment_picked_email	New appointment request by Electric tesla - 1234 princes highway, heathmere, victoria, australia	2017-08-09 00:25:54.489894	2017-08-09 00:25:55.070246	2017-08-09 00:26:18.555082	81
569	O9ckL84R2ZIuXniOHzkgMQ0bk1aRMxxF	tesla@email.com	5	User	TradyMailer#appointment_accepted_email	Appointment confirmed by tenant Rita - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:26:32.494278	2017-08-09 00:26:32.945109	\N	81
579	X0NF9WOYVs05xC62Sv9EVjd1bHVq1dDh	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 757 George Street, Haymarket, New South Wales, Australia	2017-08-09 07:10:32.502593	2017-08-09 07:10:33.471206	\N	82
594	LD1ruFSbDqLCLTLrYaZ9DNvwOBGES1RP		\N	\N	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 567 George Street, Sydney, New South Wales, Australia	2017-08-15 05:08:22.347559	\N	\N	86
571	A7sbba6MdUL8l2oSV7177dxHv3FmvBpE	tesla@email.com	5	User	TradyMailer#tenant_cancelled_appointment_email	Cancelled appointment by tenant - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:26:53.908035	2017-08-09 00:26:54.398009	\N	\N
570	PN2Jre7dmvRrdlEesKvSzZ6cq7jWnCMN	tesla@email.com	5	User	TradyMailer#alternative_appointment_picked_email	 New appointment request by tenant Rita - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:26:53.44028	2017-08-09 00:26:53.929174	2017-08-09 00:27:07.636437	81
580	gGNXcub9jKxCmMGCF6fekSPMlRusz9iy	handyman@email.com	4	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-09 07:42:52.134882	2017-08-09 07:42:52.763152	\N	74
572	Az8bNKy55fk2bYWPJg5tDTAMJCOuzSf9	rita@email.com	3	User	TenantMailer#appointment_accepted_email	Appointment confirmed by Electric tesla - 1234 Princes Highway, Heathmere, Victoria, Australia	2017-08-09 00:31:50.821038	2017-08-09 00:31:51.27159	\N	81
573	p1mZek6GFV0h8t4juV6OM2ZsF7yvXIwT	bio@email.com	20	User	UserMailer#set_password_email	Password setup for - maintenanceapp	2017-08-09 02:39:33.174992	2017-08-09 02:39:33.813362	\N	\N
586	VQdTSlK2Sr5kmL79qkcauDzUUQCNBfI2	romina@email.com	18	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-09 21:22:27.03802	2017-08-09 21:22:28.322358	\N	85
574	zxfKL9GtoMpSEoCa0DQpVk0QzYvMOf3S	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-09 02:39:33.887407	2017-08-09 02:39:34.516746	\N	\N
581	T4Frk917Lx7SbwKAI3ca4bhA863OAsra	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-09 07:42:52.907682	2017-08-09 07:42:53.404338	\N	\N
575	ZPf9rWHdFguJoriJ343UspYSbxwloX5c	bio@email.com	20	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-09 02:39:34.548065	2017-08-09 02:39:35.050671	\N	77
576	Ld9mZZARvgpOiLKTKU8vdTtmzZl0COB4	handyman@email.com	4	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-09 06:37:19.218132	2017-08-09 06:37:19.851133	\N	76
577	OSVrLYd0B2r8YgVNwuo2JmW63Kwf0UBZ	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-09 06:37:19.941097	2017-08-09 06:37:20.47313	\N	\N
590	gCTSzZedB5gUgZ9aDMBkobzYH3FyZ6zs	romina@email.com	18	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-09 21:25:09.520623	2017-08-09 21:25:10.099707	\N	85
578	GPTOUFSDM702dj8buHCgP5g5kni9JIzx	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 757 George Street, Haymarket, New South Wales, Australia	2017-08-09 07:10:32.206615	2017-08-09 07:10:33.090203	\N	82
587	e691TDE9Unlwm02TUyZA6HmNtcMUrkPl	romina@email.com	18	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-09 21:23:01.398057	2017-08-09 21:23:01.953001	\N	85
583	9An8ZWlyMEPRsaQhwQIvfwwjBn3lBh9C	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-09 20:33:13.35776	2017-08-09 20:33:14.040772	\N	83
582	H3daQptjNsc0FWjCWJEHlLfdikARcVfc	romina@email.com	18	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-09 20:33:12.97931	2017-08-09 20:33:14.691308	\N	83
584	6TofRVbvZ0tyyax3IJCxyDYfFIf1F6hU	romina@email.com	18	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 3456 Pacific Highway, Springwood, Queensland, Australia	2017-08-09 20:34:13.019028	2017-08-09 20:34:13.68308	\N	84
585	iZFp1PdmskFCgHYeftKj2coF1nc7uQFZ	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 3456 Pacific Highway, Springwood, Queensland, Australia	2017-08-09 20:34:13.292408	2017-08-09 20:34:13.962499	\N	84
588	rkclHZoXM53UDu5jY2D7OGZ7poH8s9io	romina@email.com	18	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-09 21:24:06.110079	2017-08-09 21:24:06.642668	\N	85
592	pMqso9UJgKoRafCmWxtID5cBF28jJiDK	romina@email.com	18	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-09 21:26:14.558056	2017-08-09 21:26:15.213065	\N	85
589	GfEzxdauXvAI17MJnD4DHDEQsPzDdC1i	romina@email.com	18	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-09 21:25:00.701196	2017-08-09 21:25:01.289441	\N	85
591	SNQCRrgskE1FC5h28INbKKKrAv7It8va	romina@email.com	18	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-09 21:25:38.54814	2017-08-09 21:25:39.127683	\N	85
593	uwLWfY01T7n9Rv1mAIGw6a5OGhMxDNp7	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-09 21:26:14.760099	2017-08-09 21:26:15.386297	\N	85
597	oDeJQMeIBETT8k86AkGQUCZk0Uxyne1O	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 36 Princes Highway, Eden, New South Wales, Australia	2017-08-16 04:24:13.291529	2017-08-16 04:24:14.199888	\N	87
595	SOnwIT6a3Z0NnVEt2HOANYzw7LR6l2C9	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 567 George Street, Sydney, New South Wales, Australia	2017-08-15 05:08:22.644564	2017-08-15 05:08:24.626452	\N	86
598	RP0PjYVVCCcdTVCSqvtJCY9DoiUYshxb	handyman@email.com	4	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 36 Princes Highway, Eden, New South Wales, Australia	2017-08-16 05:11:48.485972	2017-08-16 05:11:49.120779	2017-08-16 05:11:58.55893	87
596	2y6ajjddTjgDSJsEtbX1zhasN4qkUuKU	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 36 Princes Highway, Eden, New South Wales, Australia	2017-08-16 04:24:12.882718	2017-08-16 04:24:13.870495	\N	87
599	6jHCrxY7g7s3fNnO1eU3DexKwdYf3S5f	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 36 Princes Highway, Eden, New South Wales, Australia	2017-08-16 05:11:49.246807	2017-08-16 05:11:49.726114	\N	\N
608	8OqubOlV0Imf7yyXW0a8shThOtT4ElMQ	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Quote recieved from Handy man - 234 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 03:05:46.91173	2017-08-21 03:05:48.010287	\N	89
600	XFUcPPfSzbGtzGXgRu3fZD4jyW4qb2E1	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Quote recieved from Handy man - 36 Princes Highway, Eden, New South Wales, Australia	2017-08-16 05:12:34.109223	2017-08-16 05:12:34.665453	\N	87
601	POgwS75LvlQR0159GkQ8I2RXPswR1IUl	handyman@email.com	4	User	TradyMailer#work_order_email	Work Order from Leaders inc- 456 Princes Highway, Rockdale, New South Wales, Australia (We712fb0eb1)	2017-08-16 07:56:57.78878	2017-08-16 07:56:58.348037	\N	72
624	0I2XnYe04rGi2H3WM1jS4N5xmyI9AHMY	rita@email.com	3	User	TenantMailer#tenant_quote_approved_notification_email	Quote Approved by Agent, Martin - 123 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 07:11:49.632831	2017-08-21 07:11:50.514836	\N	\N
609	6lNYEjQJT2UwNuUskftXF7n29jzs2KsM	handyman@email.com	4	User	TradyMailer#approved_quote_email	Work Order from Leaders inc- 234 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 03:06:54.490231	2017-08-21 03:06:55.24856	\N	89
602	bEJrAul58qx826B4K3yRRyjbgbebLfRA	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 345 Princes Highway, Woonona, New South Wales, Australia	2017-08-17 17:49:44.611645	2017-08-17 17:49:45.913753	\N	88
603	lqYRCSNyjkH16rNKFF1vzDSJuziqfQqw	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 345 Princes Highway, Woonona, New South Wales, Australia	2017-08-17 17:49:45.38225	2017-08-17 17:49:46.258645	\N	88
604	s0p55uIB3zaaWu5gAx0PwSDPXlvha0nP	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 234 Princes Highway, Port Fairy, Victoria, Australia	2017-08-18 06:10:39.743955	2017-08-18 06:10:41.565055	\N	89
605	5NthcWPhU2ihmyWMHyfB4eIzE0bh9jZo	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 234 Princes Highway, Port Fairy, Victoria, Australia	2017-08-18 06:10:40.298309	2017-08-18 06:10:41.916353	\N	89
610	WmBoSlWadhEdgZwnFguMuaiz1ZxcRENq	martin@maintenanceapp.com.au	2	User	AgentMailer#quote_has_been_approved_email	Quote approved by landlord Bernard - 234 Princes Highway, Port Fairy, Victoria, Australia.	2017-08-21 03:06:55.425406	2017-08-21 03:06:56.129461	\N	\N
621	CZXVf4HlVguer2TG0PrFAXW3Z9NOCI0y	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Quote recieved from Electro - 123 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 07:10:01.080737	2017-08-21 07:10:02.019069	\N	71
607	6RBrBnop7XAX7R16woMET1kFLFGdrUJq	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 234 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 03:01:15.34159	2017-08-21 03:01:16.067179	\N	\N
606	XuhfnTKf6FUDVUSpWP9oVsYqq97Z7ZRc	handyman@email.com	4	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 234 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 03:01:14.091446	2017-08-21 03:01:15.082742	2017-08-21 03:02:53.871153	89
611	BYsVCyjLKPotoJbR01bmSMIEQQFurfp5	rita@email.com	3	User	TenantMailer#tenant_quote_approved_notification_email	Quote Approved by landlord, Bernard - 234 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 03:06:56.438558	2017-08-21 03:06:57.377344	\N	\N
616	POPpO4fMmnjwpz5i969UeXQtji5u9dHd	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 123 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 04:06:27.610165	2017-08-21 04:06:28.399738	\N	\N
612	6oG26lOoL20S6fSajzTxjKg8AWjVGRag	bernard@email.com	6	User	LandlordMailer#quote_has_been_approved_email	Work order sent by Leaders inc - 234 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 03:06:57.515136	2017-08-21 03:06:58.221999	\N	\N
619	FM91LYgkiVTRLYUm8QBJkCeIklbGnZYv	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Quote recieved from Handy man - 123 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 06:08:23.681618	2017-08-21 06:08:24.489276	2017-08-21 06:08:52.325708	71
614	2INyQiaOtAQS5xY1uN42fmBbHMIHheVz	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 123 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 04:06:10.417493	2017-08-21 04:06:11.397268	\N	\N
623	6UXyPq9hjfrQf8RxVlsfm9v5d4RkeybM	bernard@email.com	6	User	LandlordMailer#quote_has_been_approved_email	Work order sent by Leaders inc - 123 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 07:11:48.420262	2017-08-21 07:11:49.447161	\N	\N
615	rljvcUssABDOKCQtOtrZBwP76OTmwKX8	tesla@email.com	5	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 123 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 04:06:26.204549	2017-08-21 04:06:27.077154	2017-08-21 07:05:10.24151	71
618	3o6PzaM0Tsw4MFK44UGH67bnhfPGlT56	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 123 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 04:07:09.341089	2017-08-21 04:07:10.102589	\N	\N
613	sX2uCrErgo9XARbnxEVvV74NLRSsqHoX	handyman@email.com	4	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 123 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 04:06:08.861266	2017-08-21 04:06:09.975718	2017-08-21 04:59:49.314213	71
622	q0w3YlNwrd5HNPThlZ9TIKsArlVgcoVw	handyman@email.com	4	User	TradyMailer#approved_quote_email	Work Order from Leaders inc- 123 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 07:11:46.72053	2017-08-21 07:11:47.973994	\N	71
620	9tTCRiWOROOEmDAnZT6HAUrlqetihLu6	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Quote recieved from Elon - 123 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 07:05:58.797137	2017-08-21 07:05:59.908334	\N	71
617	PFAXkrURhuIPEA39ZPicOLIFByP6oKCj	electro@email.com	10	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 123 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 04:07:08.268967	2017-08-21 04:07:09.165627	2017-08-21 07:06:26.475183	71
625	GER3whstZLQH1wNZAKwiSF5ATmE3ZZUH	martin@maintenanceapp.com.au	2	User	AgentMailer#quote_has_been_approved_email	Quote approved for - 123 Princes Highway, Port Fairy, Victoria, Australia.	2017-08-21 07:11:50.6268	2017-08-21 07:11:51.376551	\N	\N
627	zT53lnPHs7WHLReScxAYLE0M6kzEdyyU	handyman@email.com	4	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 345 Princes Highway, Woonona, New South Wales, Australia	2017-08-21 08:57:42.900294	2017-08-21 08:57:44.194201	2017-08-21 08:58:06.561808	88
626	xWYP78GwGd0xETM1NAcCR0DWtE6mZU5j	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Quote recieved from Handy man - 123 Princes Highway, Port Fairy, Victoria, Australia	2017-08-21 08:20:12.995916	2017-08-21 08:20:13.955077	\N	71
628	I78OPeLW5CP6iN2VtH771A499Z57r36s	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 345 Princes Highway, Woonona, New South Wales, Australia	2017-08-21 08:57:44.421161	2017-08-21 08:57:45.205685	\N	\N
629	eyVbp5INwbeUUG9vp3yJkArJ4g8UkwGy	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Quote recieved from Handy man - 345 Princes Highway, Woonona, New South Wales, Australia	2017-08-21 19:13:19.364002	2017-08-21 19:13:20.307973	\N	88
638	hvkAlNYzCxROfUXFUs72FnpxnInepaJ0	martin@maintenanceapp.com.au	2	User	AgentMailer#agent_submitted_maintenance_request_email	Maintenance request submitted you on behalf of Rita - 69 Cook Road, Centennial Park, New South Wales, Australia.	2017-08-22 22:40:06.472382	2017-08-22 22:40:07.125	\N	\N
630	TkJJkV3cm1DkPsCsCXCs32PlEoZGxuVc	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 765 Princes Highway, Tempe, New South Wales, Australia	2017-08-22 01:00:23.74189	2017-08-22 01:00:24.628322	\N	90
631	mzsks1sSqNo3bVHNcntPkbDCqZNvTU74	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 765 Princes Highway, Tempe, New South Wales, Australia	2017-08-22 01:00:24.207094	2017-08-22 01:00:24.982827	\N	90
644	Zb2fro8WBva6Hh4QBUBV6WPo4ydaU5Jr	peterpipes@email.com	22	User	UserMailer#set_password_email	Password setup for - maintenanceapp	2017-08-24 05:37:43.739063	2017-08-24 05:37:44.385213	\N	\N
639	f9yLMYZLgy6RCpcWI30TKeGSehJGxCHd	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Quote recieved from Handy man - 456 Princes Highway, Rockdale, New South Wales, Australia	2017-08-23 02:38:29.064604	2017-08-23 02:38:29.614982	\N	65
633	R1iMdSg8UtJOR7mkt6XjJg6G7nsqUQkL	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 69 Cook Road, Centennial Park, New South Wales, Australia	2017-08-22 02:29:31.709513	2017-08-22 02:29:32.546297	2017-08-22 02:29:37.891388	91
632	W1vDsLbcRKMCYIGvOyMnzLqv5ED0DvDA	martin@maintenanceapp.com.au	2	User	ApplicationMailer#send_agency_admin_or_agent_maintenance_request_email	Maintenance request from Rita - 69 Cook Road, Centennial Park, New South Wales, Australia	2017-08-22 02:29:31.321283	2017-08-22 02:29:32.400972	2017-08-22 02:36:18.932041	91
640	3qqAmwFKy5ugU25KRCPGYnkD7rWN9zST	martin@maintenanceapp.com.au	2	User	AgentMailer#agent_submitted_maintenance_request_email	Your maintenance request submitted on behalf of Rita - 69 George Street, The Rocks, New South Wales, Australia.	2017-08-23 02:41:29.354427	2017-08-23 02:41:29.903794	\N	\N
635	nm4zmAECeuGicW0bK2YAzprSdsxaExaf	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 69 Cook Road, Centennial Park, New South Wales, Australia	2017-08-22 02:37:36.657515	2017-08-22 02:37:37.140147	\N	\N
634	1gNhTbw7FKCMglhDRqWMtuqHTo53xJx0	handyman@email.com	4	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 69 Cook Road, Centennial Park, New South Wales, Australia	2017-08-22 02:37:35.981468	2017-08-22 02:37:36.507371	2017-08-22 02:37:51.06091	91
649	r74SWRcMGS1zu1DkjgUJ7Oz2R6vG6ItG	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 69 George Street, The Rocks, New South Wales, Australia	2017-08-24 05:40:26.026002	2017-08-24 05:40:26.613281	\N	\N
636	ofUO1Qh1pGGlDUhSvSoTfu4AOAuNMTpt	martin@maintenanceapp.com.au	2	User	AgentMailer#send_agent_quote	Quote recieved from Handy man - 69 Cook Road, Centennial Park, New South Wales, Australia	2017-08-22 02:39:05.381849	2017-08-22 02:39:06.019033	\N	91
641	YqS4yyqNHIOIv8jV7jiSgl3t78RZWJqI	rita@email.com	3	User	TenantMailer#tenant_maintenace_request_submitted_by_agent	A maintenance request was submitted by Martin - 69 George Street, The Rocks, New South Wales, Australia	2017-08-23 06:45:13.516718	2017-08-23 06:45:14.17107	\N	\N
637	wh3ydjX9mOTqiHo5cHZVE6NqY7I9dhFY	rita@email.com	3	User	ApplicationMailer#email_extra_tenant	 Receipt for maintenance request - 69 Cook Road, Centennial Park, New South Wales, Australia	2017-08-22 22:38:43.677857	2017-08-22 22:38:44.626856	\N	92
645	tKsG6MNxVYvvYoCcOt3X01v7uc2FzARN	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 69 George Street, The Rocks, New South Wales, Australia	2017-08-24 05:37:44.55641	2017-08-24 05:37:45.219311	\N	\N
642	2xCIZRSCBFkplNwLtUytonoCvX25HAna	handyman@email.com	4	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 69 George Street, The Rocks, New South Wales, Australia	2017-08-24 05:34:22.396383	2017-08-24 05:34:23.267861	\N	93
643	aZcfDZvdP6AfbXug9S09tjfhIXVzvAiL	rita@email.com	3	User	TenantMailer#tenant_quote_requested_notification_email	Quote requested by Leaders inc - 69 George Street, The Rocks, New South Wales, Australia	2017-08-24 05:34:23.4683	2017-08-24 05:34:24.176751	\N	\N
646	GJJBHUPrPedbCBW9Zy0esY39AYWN6ASv	peterpipes@email.com	22	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 69 George Street, The Rocks, New South Wales, Australia	2017-08-24 05:37:45.384919	2017-08-24 05:37:46.045775	\N	93
647	pr6AwrHPc1obOofhZTt5dNBpM5olaNEq	electro@email.com	10	User	TradyMailer#work_order_email	Work Order from Leaders inc- 69 George Street, The Rocks, New South Wales, Australia (W99869ae3c4)	2017-08-24 05:39:44.545836	2017-08-24 05:39:45.26934	\N	93
648	THPH6yS3ndcnXb5DG8zXJ4tRzxKW7FK0	bio@email.com	20	User	TradyMailer#request_quote_email	Quote request fromLeaders inc- 69 George Street, The Rocks, New South Wales, Australia	2017-08-24 05:40:25.070223	2017-08-24 05:40:25.804108	\N	93
650	rmPJRWJ2oFgWBotZ7BDjqxbjK3H7NiUu	romina@email.com	18	User	AgentMailer#maintenance_request_reassigned_email	A maintenance request has been reassiged to you for - 69 Cook Road, Centennial Park, New South Wales, Australia.	2017-08-25 01:16:02.261478	2017-08-25 01:16:03.120958	2017-08-25 01:16:21.944196	\N
\.


--
-- Name: ahoy_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('ahoy_messages_id_seq', 650, true);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY appointments (id, trady_id, tenant_id, maintenance_request_id, date, "time", status, comment, created_at, updated_at, landlord_id, current_user_role, appointment_type) FROM stdin;
1	\N	1	9	2017-06-30	21:56:00	Active	\N	2017-06-28 11:11:32.789015	2017-06-28 11:11:32.789015	1	Landlord	Landlord Appointment
2	1	1	9	2017-07-01	04:30:00	Active	\N	2017-06-28 11:22:30.318505	2017-06-28 11:22:30.318505	\N	Trady	Work Order Appointment
3	1	1	18	2017-06-30	06:15:00	Declined	\N	2017-06-28 18:43:54.529171	2017-06-28 18:46:34.980231	\N	Trady	Work Order Appointment
5	1	1	18	2017-06-30	04:45:00	Active	\N	2017-06-28 18:54:09.615273	2017-06-28 18:54:09.615273	\N	Trady	Work Order Appointment
4	1	1	18	2017-06-30	03:45:00	Declined	\N	2017-06-28 18:46:34.743919	2017-06-28 18:54:10.19191	\N	Tenant	Work Order Appointment
30	1	1	23	2017-07-27	09:45:00	Active	\N	2017-07-03 09:26:26.835562	2017-07-03 09:26:26.835562	\N	Trady	Work Order Appointment
7	1	1	23	2017-07-01	05:30:00	Cancelled	\N	2017-06-29 06:19:40.078205	2017-07-03 09:26:27.295578	\N	Tenant	Work Order Appointment
31	1	1	23	2017-07-27	04:45:00	Active	\N	2017-07-03 09:32:32.98874	2017-07-03 09:32:32.98874	\N	Trady	Quote Appointment
12	1	1	23	2017-06-30	06:45:00	Cancelled	\N	2017-06-29 07:29:31.101981	2017-07-03 09:32:33.473661	\N	Tenant	Quote Appointment
6	1	1	23	2017-06-30	10:15:00	Active	\N	2017-06-29 06:09:16.331879	2017-06-29 06:19:40.385621	\N	Trady	Work Order Appointment
9	1	1	23	2017-06-24	03:30:00	Declined	\N	2017-06-29 06:57:36.534809	2017-06-29 06:58:48.218758	\N	Trady	Work Order Appointment
41	1	1	28	2017-07-27	04:45:00	Active	\N	2017-07-04 17:03:23.009806	2017-07-04 17:03:23.009806	\N	Tenant	Quote Appointment
42	1	1	28	2017-07-20	04:15:00	Active	\N	2017-07-04 17:08:52.608793	2017-07-04 17:08:52.608793	\N	Tenant	Quote Appointment
32	\N	1	26	2017-07-27	10:45:00	Cancelled	\N	2017-07-03 13:34:00.624924	2017-07-03 13:41:19.207437	1	Landlord	Landlord Appointment
11	1	1	23	2017-06-30	04:30:00	Declined	\N	2017-06-29 07:26:14.898756	2017-06-29 07:29:31.362642	\N	Trady	Quote Appointment
43	1	1	28	2017-07-19	04:30:00	Active	\N	2017-07-04 17:12:10.20118	2017-07-04 17:12:10.20118	\N	Tenant	Quote Appointment
33	\N	1	26	2017-07-28	06:30:00	Cancelled	\N	2017-07-03 13:41:18.59905	2017-07-03 13:48:23.175378	1	Tenant	Landlord Appointment
44	1	1	28	2017-07-20	05:45:00	Active	\N	2017-07-05 03:05:32.103963	2017-07-05 03:05:32.103963	\N	Tenant	Quote Appointment
40	1	1	28	2017-07-20	04:30:00	Declined	\N	2017-07-04 17:02:37.429981	2017-07-05 03:05:32.443948	\N	Trady	Quote Appointment
13	\N	1	23	2017-06-30	10:45:00	Active	\N	2017-06-29 07:47:26.715214	2017-06-29 07:47:26.715214	1	Landlord	Landlord Appointment
14	\N	1	23	2017-06-30	04:30:00	Active	\N	2017-06-29 07:51:41.160827	2017-06-29 07:51:41.160827	1	Landlord	Landlord Appointment
15	\N	1	23	2017-06-30	05:30:00	Active	\N	2017-06-29 07:52:59.826241	2017-06-29 07:52:59.826241	1	Landlord	Landlord Appointment
16	\N	1	23	2017-07-18	03:15:00	Active	\N	2017-06-29 07:53:55.798141	2017-06-29 07:53:55.798141	1	Landlord	Landlord Appointment
17	\N	1	23	2017-07-09	00:15:00	Active	\N	2017-06-29 07:54:39.714784	2017-06-29 07:54:39.714784	1	Landlord	Landlord Appointment
18	\N	1	23	2017-07-26	02:30:00	Active	\N	2017-06-29 07:58:39.115316	2017-06-29 07:58:39.115316	1	Landlord	Landlord Appointment
19	\N	1	23	2017-07-26	10:15:00	Declined	\N	2017-06-29 07:59:14.631659	2017-06-29 08:03:54.328803	1	Landlord	Landlord Appointment
20	\N	1	23	2017-06-30	04:30:00	Declined	\N	2017-06-29 08:03:53.897194	2017-06-29 08:04:41.020255	1	Tenant	Landlord Appointment
21	\N	1	23	2017-07-01	10:30:00	Declined	\N	2017-06-29 08:04:40.698081	2017-06-29 08:07:24.754238	1	Landlord	Landlord Appointment
22	\N	1	23	2017-06-30	06:45:00	Declined	\N	2017-06-29 08:07:24.384171	2017-06-29 08:08:04.948258	1	Tenant	Landlord Appointment
23	\N	1	23	2017-06-30	05:15:00	Declined	\N	2017-06-29 08:08:04.60106	2017-06-29 08:09:47.71269	1	Landlord	Landlord Appointment
25	\N	1	23	2017-07-01	05:45:00	Active	\N	2017-06-29 08:10:37.946719	2017-06-29 08:10:37.946719	1	Landlord	Landlord Appointment
24	\N	1	23	2017-06-30	05:30:00	Declined	\N	2017-06-29 08:09:47.330252	2017-06-29 08:10:38.320893	1	Tenant	Landlord Appointment
26	\N	1	23	2017-06-30	05:45:00	Accepted	\N	2017-06-29 12:48:31.523642	2017-06-29 12:48:59.659834	1	Landlord	Landlord Appointment
27	1	1	25	2017-07-01	06:45:00	Accepted	\N	2017-06-30 11:26:49.165136	2017-06-30 11:28:09.206668	\N	Trady	Quote Appointment
28	1	1	23	2017-07-29	08:45:00	Active	\N	2017-07-03 08:44:13.351265	2017-07-03 08:44:13.351265	\N	Trady	Work Order Appointment
10	1	1	23	2017-07-01	02:15:00	Cancelled	\N	2017-06-29 06:58:47.847255	2017-07-03 08:44:13.892415	\N	Tenant	Work Order Appointment
29	1	1	23	2017-07-20	03:45:00	Active	\N	2017-07-03 09:21:28.0145	2017-07-03 09:21:28.0145	\N	Trady	Work Order Appointment
8	1	1	23	2017-07-01	08:30:00	Cancelled	\N	2017-06-29 06:39:58.063668	2017-07-03 09:21:28.510977	\N	Trady	Work Order Appointment
35	\N	1	26	2017-07-12	04:30:00	Active	\N	2017-07-03 13:54:12.855478	2017-07-03 13:54:12.855478	1	Tenant	Landlord Appointment
45	\N	1	28	2017-07-20	07:45:00	Declined	\N	2017-07-05 03:24:46.615832	2017-07-05 03:25:21.205001	1	Landlord	Landlord Appointment
36	\N	1	26	2017-07-27	07:30:00	Active	\N	2017-07-03 13:57:12.988747	2017-07-03 13:57:12.988747	1	Tenant	Landlord Appointment
46	\N	1	28	2017-07-27	07:30:00	Declined	\N	2017-07-05 03:25:20.93637	2017-07-05 03:27:15.012514	1	Tenant	Landlord Appointment
37	\N	1	26	2017-07-27	05:15:00	Active	\N	2017-07-03 13:59:38.625685	2017-07-03 13:59:38.625685	1	Tenant	Landlord Appointment
47	\N	1	28	2017-07-20	04:15:00	Declined	\N	2017-07-05 03:27:14.616271	2017-07-05 03:27:54.903327	1	Landlord	Landlord Appointment
38	\N	1	26	2017-06-28	06:30:00	Active	\N	2017-07-03 14:00:50.671365	2017-07-03 14:00:50.671365	1	Tenant	Landlord Appointment
48	\N	1	28	2017-07-20	03:30:00	Declined	\N	2017-07-05 03:27:54.586943	2017-07-05 03:32:03.626884	1	Tenant	Landlord Appointment
39	\N	1	26	2017-07-19	07:15:00	Active	\N	2017-07-03 14:02:28.264329	2017-07-03 14:02:28.264329	1	Landlord	Landlord Appointment
34	\N	1	26	2017-07-27	02:30:00	Cancelled	\N	2017-07-03 13:48:22.490985	2017-07-03 14:02:28.677924	1	Landlord	Landlord Appointment
49	\N	1	28	2017-07-20	04:30:00	Declined	\N	2017-07-05 03:32:03.312497	2017-07-05 03:36:36.811609	1	Landlord	Landlord Appointment
50	\N	1	28	2017-07-27	04:30:00	Declined	\N	2017-07-05 03:36:36.540226	2017-07-05 03:44:53.28734	1	Tenant	Landlord Appointment
51	\N	1	28	2017-07-13	04:30:00	Declined	\N	2017-07-05 03:44:52.974993	2017-07-05 03:45:46.120004	1	Landlord	Landlord Appointment
52	\N	1	28	2017-07-14	03:45:00	Declined	\N	2017-07-05 03:45:45.826152	2017-07-05 04:11:22.27442	1	Tenant	Landlord Appointment
53	\N	1	28	2017-07-05	02:15:00	Declined	\N	2017-07-05 04:11:21.962292	2017-07-05 04:12:21.319582	1	Landlord	Landlord Appointment
54	\N	1	28	2017-08-03	03:15:00	Declined	\N	2017-07-05 04:12:20.98853	2017-07-05 04:13:49.897708	1	Tenant	Landlord Appointment
55	\N	1	28	2017-07-20	05:15:00	Declined	\N	2017-07-05 04:13:49.526677	2017-07-05 04:15:29.984684	1	Landlord	Landlord Appointment
56	\N	1	28	2017-07-04	04:30:00	Declined	\N	2017-07-05 04:15:29.669701	2017-07-05 05:05:01.415372	1	Tenant	Landlord Appointment
58	\N	1	28	2017-07-20	04:30:00	Active	\N	2017-07-05 05:05:50.692391	2017-07-05 05:05:50.692391	1	Tenant	Landlord Appointment
57	\N	1	28	2017-07-20	03:30:00	Declined	\N	2017-07-05 05:05:01.073348	2017-07-05 05:05:51.039525	1	Landlord	Landlord Appointment
59	1	1	29	2017-07-20	04:30:00	Active	\N	2017-07-07 07:49:38.775153	2017-07-07 07:49:38.775153	\N	Trady	Quote Appointment
60	1	1	29	2017-07-13	03:45:00	Active	\N	2017-07-07 07:51:09.54309	2017-07-07 07:51:09.54309	\N	Trady	Quote Appointment
61	2	1	30	2017-07-19	04:45:00	Declined	\N	2017-07-10 11:50:08.851499	2017-07-10 12:12:00.654948	\N	Trady	Quote Appointment
62	2	1	30	2017-07-25	07:30:00	Declined	\N	2017-07-10 12:12:00.381206	2017-07-13 03:02:00.286229	\N	Tenant	Quote Appointment
63	\N	1	30	2017-07-18	10:45:00	Declined	\N	2017-07-10 12:48:03.660067	2017-07-10 12:49:22.114699	1	Landlord	Landlord Appointment
66	\N	1	30	2017-07-11	06:00:00	Active	\N	2017-07-10 13:14:25.587703	2017-07-10 13:14:25.587703	1	Tenant	Landlord Appointment
65	\N	1	30	2017-07-13	04:30:00	Declined	\N	2017-07-10 13:13:31.601015	2017-07-10 13:14:25.889852	1	Landlord	Landlord Appointment
64	\N	1	30	2017-07-19	03:30:00	Declined	\N	2017-07-10 12:49:21.865052	2017-07-10 13:13:31.884005	1	Tenant	Landlord Appointment
67	1	1	30	2017-07-27	16:00:00	Active	\N	2017-07-13 03:01:59.83504	2017-07-13 03:01:59.83504	\N	Trady	Quote Appointment
68	1	1	61	2017-07-19	11:30:00	Active	\N	2017-07-19 12:56:14.218914	2017-07-19 12:56:14.218914	\N	Trady	Quote Appointment
69	2	1	61	2017-07-31	14:15:00	Active	\N	2017-07-19 18:56:45.66207	2017-07-19 18:56:45.66207	\N	Trady	Quote Appointment
70	1	1	65	2017-07-27	17:30:00	Active	\N	2017-07-25 21:56:25.699157	2017-07-25 21:56:25.699157	\N	Trady	Quote Appointment
71	1	1	65	2017-07-25	20:15:00	Active	\N	2017-07-25 22:04:36.675426	2017-07-25 22:04:36.675426	\N	Trady	Quote Appointment
72	1	1	65	2017-07-31	02:30:00	Declined	\N	2017-07-25 22:06:36.677538	2017-07-25 22:17:17.138543	\N	Trady	Quote Appointment
73	1	1	65	2017-07-31	02:15:00	Declined	\N	2017-07-25 22:17:16.823817	2017-07-25 22:20:10.402294	\N	Tenant	Quote Appointment
74	1	1	65	2017-07-31	02:15:00	Accepted	\N	2017-07-25 22:20:10.090033	2017-07-25 22:38:29.652487	\N	Trady	Quote Appointment
75	1	1	65	2017-07-31	05:30:00	Declined	\N	2017-07-26 00:13:46.376421	2017-07-26 00:16:22.801381	\N	Trady	Work Order Appointment
76	1	1	65	2017-07-25	23:30:00	Cancelled	\N	2017-07-26 00:16:22.412462	2017-07-26 00:27:19.666791	\N	Tenant	Work Order Appointment
78	1	1	65	2017-07-28	07:30:00	Active	\N	2017-07-26 00:28:30.057573	2017-07-26 00:28:30.057573	\N	Tenant	Work Order Appointment
77	1	1	65	2017-07-31	04:30:00	Cancelled	\N	2017-07-26 00:27:19.372009	2017-07-26 00:28:30.357259	\N	Trady	Work Order Appointment
79	1	7	66	2017-07-31	\N	Active	\N	2017-08-07 04:55:03.913224	2017-08-07 04:55:03.913224	\N	Trady	Quote Appointment
80	1	7	66	2017-07-31	\N	Active	\N	2017-08-07 04:57:28.875841	2017-08-07 04:57:28.875841	\N	Trady	Work Order Appointment
81	1	7	66	2017-08-08	\N	Active	\N	2017-08-08 04:43:52.161428	2017-08-08 04:43:52.161428	\N	Trady	Quote Appointment
82	1	7	66	2017-08-08	\N	Active	\N	2017-08-08 04:45:10.087761	2017-08-08 04:45:10.087761	\N	Trady	Quote Appointment
83	\N	1	80	2017-08-23	04:30:00	Active	\N	2017-08-08 05:39:51.260215	2017-08-08 05:39:51.260215	1	Landlord	Landlord Appointment
84	1	7	66	2017-08-22	\N	Active	\N	2017-08-08 06:39:35.627831	2017-08-08 06:39:35.627831	\N	Trady	Quote Appointment
85	1	7	66	2017-08-23	08:00:00	Active	\N	2017-08-08 06:56:42.996682	2017-08-08 06:56:42.996682	\N	Trady	Work Order Appointment
86	1	7	66	2017-08-30	01:30:00	Active	\N	2017-08-08 07:06:15.198101	2017-08-08 07:06:15.198101	\N	Trady	Quote Appointment
87	\N	1	80	2017-08-22	03:30:00	Declined	\N	2017-08-08 07:41:24.693369	2017-08-08 07:43:20.422984	1	Landlord	Landlord Appointment
88	\N	1	80	2017-08-16	15:45:00	Declined	\N	2017-08-08 07:43:20.11775	2017-08-08 07:44:46.904459	1	Tenant	Landlord Appointment
89	\N	1	80	2017-08-30	04:15:00	Accepted	\N	2017-08-08 07:44:46.643131	2017-08-08 07:45:20.079098	1	Landlord	Landlord Appointment
90	2	1	81	2017-08-23	02:30:00	Declined	\N	2017-08-08 23:49:20.210362	2017-08-08 23:52:19.300838	\N	Trady	Quote Appointment
91	2	1	81	2017-08-16	09:30:00	Accepted	\N	2017-08-08 23:52:19.060219	2017-08-08 23:53:45.187511	\N	Tenant	Quote Appointment
93	\N	1	81	2017-08-30	01:15:00	Declined	\N	2017-08-09 00:19:03.30565	2017-08-09 00:19:37.530228	3	Landlord	Landlord Appointment
94	\N	1	81	2017-08-16	03:15:00	Declined	\N	2017-08-09 00:19:37.29176	2017-08-09 00:20:41.564218	3	Tenant	Landlord Appointment
96	\N	1	81	2017-08-16	05:45:00	Active	\N	2017-08-09 00:22:55.994038	2017-08-09 00:22:55.994038	3	Landlord	Landlord Appointment
95	\N	1	81	2017-08-15	04:15:00	Cancelled	\N	2017-08-09 00:20:41.170826	2017-08-09 00:22:56.337126	3	Landlord	Landlord Appointment
92	2	1	81	2017-08-23	04:30:00	Cancelled	\N	2017-08-09 00:14:00.663742	2017-08-09 00:25:54.429159	\N	Trady	Work Order Appointment
97	2	1	81	2017-08-16	02:30:00	Cancelled	\N	2017-08-09 00:25:54.162998	2017-08-09 00:26:53.296454	\N	Trady	Work Order Appointment
98	2	1	81	2017-08-24	03:15:00	Accepted	\N	2017-08-09 00:26:53.038844	2017-08-09 00:31:50.322716	\N	Tenant	Work Order Appointment
\.


--
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('appointments_id_seq', 98, true);


--
-- Data for Name: ar_internal_metadata; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY ar_internal_metadata (key, value, created_at, updated_at) FROM stdin;
environment	development	2017-06-28 04:22:24.807414	2017-06-28 04:22:24.807414
\.


--
-- Data for Name: availabilities; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY availabilities (id, maintenance_request_id, created_at, updated_at, available_only_by_appointment, date, start_time, finish_time) FROM stdin;
1	75	2017-07-31 20:59:24.479659	2017-07-31 20:59:24.479659	f	\N	20:58:00	20:58:00
\.


--
-- Name: availabilities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('availabilities_id_seq', 1, true);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY comments (id, trady_id, tenant_id, appointment_id, body, created_at, updated_at, landlord_id) FROM stdin;
1	\N	1	1	ahsdifuhasdifuasdfiu	2017-06-28 11:11:32.797535	2017-06-28 11:11:32.797535	1
2	1	1	2	siuhfaoisufhoaisudfhoasf	2017-06-28 11:22:30.321286	2017-06-28 11:22:30.321286	\N
3	1	1	3	this is a test of the emails system	2017-06-28 18:43:54.532682	2017-06-28 18:43:54.532682	\N
4	1	\N	4	this is the second comment form the appotient 	2017-06-28 18:46:34.74771	2017-06-28 18:46:34.74771	\N
5	1	1	5	jasfaksdfgkasjdfh	2017-06-28 18:54:09.617645	2017-06-28 18:54:09.617645	\N
6	1	1	6	testing the appointment part of the app	2017-06-29 06:09:16.334391	2017-06-29 06:09:16.334391	\N
7	1	\N	7	This is the second message 	2017-06-29 06:19:40.080674	2017-06-29 06:19:40.080674	\N
8	1	1	8	this is the 3 message i think 	2017-06-29 06:39:58.067587	2017-06-29 06:39:58.067587	\N
9	1	1	9	test the trady accepting the appointment	2017-06-29 06:57:36.537361	2017-06-29 06:57:36.537361	\N
10	1	\N	10	talsduhfaisodufhuliasudfhlidsf	2017-06-29 06:58:47.850487	2017-06-29 06:58:47.850487	\N
11	1	1	11	this is an pppointment for the quotes	2017-06-29 07:26:14.901025	2017-06-29 07:26:14.901025	\N
12	1	\N	12	this is the second comment for quote appoiuntmetn	2017-06-29 07:29:31.10441	2017-06-29 07:29:31.10441	\N
13	\N	1	13	This is an appointment from the landlord	2017-06-29 07:47:26.717428	2017-06-29 07:47:26.717428	1
14	\N	1	14	erfgsdgsdfg	2017-06-29 07:51:41.164607	2017-06-29 07:51:41.164607	1
15	\N	1	15	asdlkjhsadlkf	2017-06-29 07:52:59.828458	2017-06-29 07:52:59.828458	1
16	\N	1	16	hjgkjhgk	2017-06-29 07:53:55.800558	2017-06-29 07:53:55.800558	1
17	\N	1	17	giuhoiyu	2017-06-29 07:54:39.717078	2017-06-29 07:54:39.717078	1
18	\N	1	18	jhaskhjasdfkj	2017-06-29 07:58:39.118637	2017-06-29 07:58:39.118637	1
19	\N	1	19	aksjdhkasjdf	2017-06-29 07:59:14.63424	2017-06-29 07:59:14.63424	1
20	\N	\N	20	askdjfhaskldf	2017-06-29 08:03:53.899923	2017-06-29 08:03:53.899923	1
21	\N	1	21	this is the last comment 	2017-06-29 08:04:40.700493	2017-06-29 08:04:40.700493	1
22	\N	\N	22	fgdhdfhgfg	2017-06-29 08:07:24.386858	2017-06-29 08:07:24.386858	1
23	\N	1	23	ajhfsahfksaf	2017-06-29 08:08:04.6043	2017-06-29 08:08:04.6043	1
24	\N	\N	24	this is the landlord	2017-06-29 08:09:47.332534	2017-06-29 08:09:47.332534	1
25	\N	1	25	This is the true landlord	2017-06-29 08:10:37.950091	2017-06-29 08:10:37.950091	1
26	\N	1	26	testting the tenant	2017-06-29 12:48:31.550929	2017-06-29 12:48:31.550929	1
27	1	1	27	testing appointment 	2017-06-30 11:26:49.168854	2017-06-30 11:26:49.168854	\N
28	1	1	28	cancelling appointment 	2017-07-03 08:44:13.385531	2017-07-03 08:44:13.385531	\N
29	1	1	29	sorry I cant make it at that time any more can only make it for	2017-07-03 09:21:28.017884	2017-07-03 09:21:28.017884	\N
30	1	1	30	cant make it sorry 	2017-07-03 09:26:26.83814	2017-07-03 09:26:26.83814	\N
31	1	1	31	Sorry I cant make it to this time 	2017-07-03 09:32:32.992593	2017-07-03 09:32:32.992593	\N
32	\N	1	32	This is a comment.	2017-07-03 13:34:00.643775	2017-07-03 13:34:00.643775	1
33	\N	\N	33	I have to cancel	2017-07-03 13:41:18.604135	2017-07-03 13:41:18.604135	1
34	\N	1	34	halskdfhskladf	2017-07-03 13:48:22.493451	2017-07-03 13:48:22.493451	1
35	\N	\N	35	wertwert	2017-07-03 13:54:12.859094	2017-07-03 13:54:12.859094	1
36	\N	\N	36	sdfgsgdfg	2017-07-03 13:57:12.991341	2017-07-03 13:57:12.991341	1
37	\N	\N	37	ddfgdfg	2017-07-03 13:59:38.628826	2017-07-03 13:59:38.628826	1
38	\N	\N	38	sdfhsdgdsfg	2017-07-03 14:00:50.673618	2017-07-03 14:00:50.673618	1
39	\N	1	39	asdfasdf	2017-07-03 14:02:28.266846	2017-07-03 14:02:28.266846	1
40	1	1	40	testing the decline email	2017-07-04 17:02:37.433139	2017-07-04 17:02:37.433139	\N
41	1	\N	41	cant testing trady decline email	2017-07-04 17:03:23.01215	2017-07-04 17:03:23.01215	\N
42	1	\N	42	uytitiu	2017-07-04 17:08:52.613035	2017-07-04 17:08:52.613035	\N
43	1	\N	43	hgfjhgfjhfghj	2017-07-04 17:12:10.204196	2017-07-04 17:12:10.204196	\N
44	1	\N	44	hgkuygkuy	2017-07-05 03:05:32.10788	2017-07-05 03:05:32.10788	\N
45	\N	1	45	yiuyuytryr	2017-07-05 03:24:46.618602	2017-07-05 03:24:46.618602	1
46	\N	\N	46	ytfuykiuygkuy	2017-07-05 03:25:20.939467	2017-07-05 03:25:20.939467	1
47	\N	1	47	uruytuytuyt	2017-07-05 03:27:14.619003	2017-07-05 03:27:14.619003	1
48	\N	\N	48	uytiuytiuy	2017-07-05 03:27:54.589227	2017-07-05 03:27:54.589227	1
49	\N	1	49	jhgkjgkjhg	2017-07-05 03:32:03.316418	2017-07-05 03:32:03.316418	1
50	\N	\N	50	kjhiuhkjh	2017-07-05 03:36:36.545519	2017-07-05 03:36:36.545519	1
51	\N	1	51	ujgykgku	2017-07-05 03:44:52.978204	2017-07-05 03:44:52.978204	1
52	\N	\N	52	hjlihliuh	2017-07-05 03:45:45.829289	2017-07-05 03:45:45.829289	1
53	\N	1	53	iuyoiuyoiu	2017-07-05 04:11:21.966999	2017-07-05 04:11:21.966999	1
54	\N	\N	54	jgkuguyfu	2017-07-05 04:12:20.990866	2017-07-05 04:12:20.990866	1
55	\N	1	55	kljhlkjh	2017-07-05 04:13:49.531195	2017-07-05 04:13:49.531195	1
56	\N	\N	56	dwefgsdfg	2017-07-05 04:15:29.673462	2017-07-05 04:15:29.673462	1
57	\N	1	57	hgjhfgjh	2017-07-05 05:05:01.075833	2017-07-05 05:05:01.075833	1
58	\N	\N	58	jhgkjgkjh	2017-07-05 05:05:50.69498	2017-07-05 05:05:50.69498	1
59	1	1	59	sdfgsdgf	2017-07-07 07:49:38.809548	2017-07-07 07:49:38.809548	\N
60	1	1	60	sdgdfsg	2017-07-07 07:51:09.545794	2017-07-07 07:51:09.545794	\N
61	2	1	61	This is an appointment for the tenant. sjhfgakjhsdfgkajshfgakjshdfgkajshiuyoiqwueyoaiufhdiuashoiufdhaoisuhdfoaisuhfiuashdfsafs	2017-07-10 11:50:08.856179	2017-07-10 11:50:08.856179	\N
62	2	\N	62	sdgsdfgsdfgsdfgdfgsdgsdfgdsg	2017-07-10 12:12:00.38398	2017-07-10 12:12:00.38398	\N
63	\N	1	63	aksjhfksjdhfsf	2017-07-10 12:48:03.662656	2017-07-10 12:48:03.662656	1
64	\N	\N	64	dhjgfkuygiuygiuygiuy	2017-07-10 12:49:21.867618	2017-07-10 12:49:21.867618	1
65	\N	1	65	wtrwerywetewrt	2017-07-10 13:13:31.603402	2017-07-10 13:13:31.603402	1
66	\N	\N	66	wertwertwet	2017-07-10 13:14:25.590988	2017-07-10 13:14:25.590988	1
67	1	1	67	This is a new appointment time	2017-07-13 03:01:59.839205	2017-07-13 03:01:59.839205	\N
68	1	1	68	testing 	2017-07-19 12:56:14.243128	2017-07-19 12:56:14.243128	\N
69	2	1	69	this is a test of the appointment	2017-07-19 18:56:45.666503	2017-07-19 18:56:45.666503	\N
70	1	1	70	this is a test of the message	2017-07-25 21:56:25.726447	2017-07-25 21:56:25.726447	\N
71	1	1	71	dfgdsfg	2017-07-25 22:04:36.679631	2017-07-25 22:04:36.679631	\N
72	1	1	72	hgfjhgfjhgfjhgf	2017-07-25 22:06:36.681612	2017-07-25 22:06:36.681612	\N
73	1	\N	73	This is a new appointment	2017-07-25 22:17:16.826355	2017-07-25 22:17:16.826355	\N
74	1	1	74	kjsdhfkjsdfg	2017-07-25 22:20:10.092756	2017-07-25 22:20:10.092756	\N
75	1	1	75	this is a test for the work workorder msg	2017-07-26 00:13:46.379266	2017-07-26 00:13:46.379266	\N
76	1	\N	76	testing the app	2017-07-26 00:16:22.414738	2017-07-26 00:16:22.414738	\N
77	1	1	77	Sorry I cant make it to this any more I will add a new time 	2017-07-26 00:27:19.375012	2017-07-26 00:27:19.375012	\N
78	1	\N	78	sorry I made a mistake cant make it then either	2017-07-26 00:28:30.060724	2017-07-26 00:28:30.060724	\N
79	1	7	79	kjhgjkhgkjh	2017-08-07 04:55:03.930289	2017-08-07 04:55:03.930289	\N
80	1	7	80	kjhgkjhgkj	2017-08-07 04:57:28.878589	2017-08-07 04:57:28.878589	\N
81	1	7	81	jhgfhjgfjhg	2017-08-08 04:43:52.164779	2017-08-08 04:43:52.164779	\N
82	1	7	82	ljhgkjhgjkh	2017-08-08 04:45:10.089766	2017-08-08 04:45:10.089766	\N
83	\N	1	83	jhgkjkjhgkj	2017-08-08 05:39:51.26427	2017-08-08 05:39:51.26427	1
84	1	7	84	jhlkjnkjlkn	2017-08-08 06:39:35.630263	2017-08-08 06:39:35.630263	\N
85	1	7	85	jhgkjhgk	2017-08-08 06:56:42.999637	2017-08-08 06:56:42.999637	\N
86	1	7	86	sfdfgdfg	2017-08-08 07:06:15.200974	2017-08-08 07:06:15.200974	\N
87	\N	1	87	sdfsdf	2017-08-08 07:41:24.696726	2017-08-08 07:41:24.696726	1
88	\N	\N	88	sfsdfsdfsadf	2017-08-08 07:43:20.119933	2017-08-08 07:43:20.119933	1
89	\N	1	89	jhgkjhgkjh	2017-08-08 07:44:46.645317	2017-08-08 07:44:46.645317	1
90	2	1	90	gfhdfhgfh	2017-08-08 23:49:20.21292	2017-08-08 23:49:20.21292	\N
91	2	\N	91	kuyfgkufj	2017-08-08 23:52:19.062703	2017-08-08 23:52:19.062703	\N
92	2	1	92	hgfjhfjfg	2017-08-09 00:14:00.666689	2017-08-09 00:14:00.666689	\N
93	\N	1	93	hvj,hbjhb	2017-08-09 00:19:03.30921	2017-08-09 00:19:03.30921	3
94	\N	\N	94	kbkjjlkbkj	2017-08-09 00:19:37.29393	2017-08-09 00:19:37.29393	3
95	\N	1	95	jhbmjhbjk	2017-08-09 00:20:41.174665	2017-08-09 00:20:41.174665	3
96	\N	1	96	dghsdfg	2017-08-09 00:22:55.996437	2017-08-09 00:22:55.996437	3
97	2	1	97	kjgkjhgkh	2017-08-09 00:25:54.166333	2017-08-09 00:25:54.166333	\N
98	2	\N	98	jhbkjhgbk	2017-08-09 00:26:53.040965	2017-08-09 00:26:53.040965	\N
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('comments_id_seq', 98, true);


--
-- Data for Name: conversations; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY conversations (id, sender_id, recipient_id, created_at, updated_at, conversation_type, maintenance_request_id, quote_id) FROM stdin;
1	\N	\N	2017-06-28 09:43:15.595971	2017-06-28 09:43:15.595971	Tenant	9	\N
2	\N	\N	2017-06-28 09:43:59.97159	2017-06-28 09:43:59.97159	Landlord	9	\N
3	\N	\N	2017-06-28 10:06:25.333872	2017-06-28 10:06:25.333872	Quote	\N	1
5	\N	\N	2017-07-03 06:04:24.920237	2017-07-03 06:04:24.920237	Trady_Agent	9	\N
6	\N	\N	2017-07-03 10:40:15.779444	2017-07-03 10:40:15.779444	Trady_Agent	27	\N
7	\N	\N	2017-07-04 08:13:19.425496	2017-07-04 08:13:19.425496	Tenant	1	\N
8	\N	\N	2017-07-04 13:21:12.299408	2017-07-04 13:21:12.299408	Landlord	26	\N
9	\N	\N	2017-07-04 15:07:21.488685	2017-07-04 15:07:21.488685	Tenant	27	\N
10	\N	\N	2017-07-04 16:00:58.889118	2017-07-04 16:00:58.889118	Trady_Agent	25	\N
11	\N	\N	2017-07-05 06:39:35.078084	2017-07-05 06:39:35.078084	Tenant	28	\N
12	\N	\N	2017-07-05 06:40:24.788181	2017-07-05 06:40:24.788181	Landlord	28	\N
13	\N	\N	2017-07-05 07:16:05.163358	2017-07-05 07:16:05.163358	Quote	\N	6
14	\N	\N	2017-07-10 08:36:48.230179	2017-07-10 08:36:48.230179	Landlord	21	\N
15	\N	\N	2017-07-10 09:33:28.778216	2017-07-10 09:33:28.778216	Tenant	30	\N
16	\N	\N	2017-07-13 04:37:27.719397	2017-07-13 04:37:27.719397	Landlord	30	\N
17	\N	\N	2017-07-13 04:38:51.050049	2017-07-13 04:38:51.050049	Trady_Agent	\N	\N
18	\N	\N	2017-07-14 19:05:49.677504	2017-07-14 19:05:49.677504	Tenant	57	\N
19	\N	\N	2017-07-19 17:02:53.685514	2017-07-19 17:02:53.685514	Tenant	62	\N
20	\N	\N	2017-07-25 20:50:18.560868	2017-07-25 20:50:18.560868	Landlord	65	\N
21	\N	\N	2017-07-25 22:39:05.831817	2017-07-25 22:39:05.831817	Tenant	65	\N
22	\N	\N	2017-07-25 23:12:02.600362	2017-07-25 23:12:02.600362	Quote	\N	14
23	\N	\N	2017-08-01 23:38:32.930231	2017-08-01 23:38:32.930231	Landlord	75	\N
24	\N	\N	2017-08-08 05:11:52.737287	2017-08-08 05:11:52.737287	Tenant	80	\N
25	\N	\N	2017-08-08 05:36:19.61635	2017-08-08 05:36:19.61635	Landlord	80	\N
26	\N	\N	2017-08-08 06:58:03.300277	2017-08-08 06:58:03.300277	Trady_Agent	66	\N
27	\N	\N	2017-08-08 23:44:36.458566	2017-08-08 23:44:36.458566	Tenant	81	\N
28	\N	\N	2017-08-08 23:47:04.778519	2017-08-08 23:47:04.778519	Landlord	81	\N
29	\N	\N	2017-08-08 23:55:57.427036	2017-08-08 23:55:57.427036	Quote	\N	18
30	\N	\N	2017-08-09 00:07:51.992327	2017-08-09 00:07:51.992327	Quote	\N	19
\.


--
-- Name: conversations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('conversations_id_seq', 30, true);


--
-- Data for Name: current_roles; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY current_roles (id, user_id, role, created_at, updated_at) FROM stdin;
1	1	\N	2017-06-28 04:22:25.346923	2017-06-28 04:22:25.346923
14	14	\N	2017-07-21 02:45:05.204373	2017-07-21 02:45:05.204373
7	7	\N	2017-06-28 09:19:45.715434	2017-06-28 09:19:45.715434
13	13	Landlord	2017-07-19 02:20:50.693515	2017-07-25 16:06:22.214249
10	10	\N	2017-07-16 11:43:44.981365	2017-08-21 07:10:16.447143
5	5	Trady	2017-06-28 05:59:31.991602	2017-08-21 19:14:19.563652
19	19	\N	2017-08-07 08:24:00.804618	2017-08-09 00:23:16.331023
15	15	\N	2017-07-26 00:34:22.154065	2017-07-26 00:34:22.154065
16	16	\N	2017-07-26 06:05:19.898101	2017-07-26 06:05:19.898101
3	3	\N	2017-06-28 05:24:33.215367	2017-08-22 02:36:10.676858
6	6	\N	2017-06-28 06:00:54.038416	2017-08-08 07:45:05.175859
20	20	\N	2017-08-09 02:39:32.781918	2017-08-09 02:39:32.781918
21	21	\N	2017-08-09 06:01:29.482765	2017-08-09 06:12:52.756316
22	22	\N	2017-08-24 05:37:43.296069	2017-08-24 05:37:43.296069
18	18	\N	2017-07-27 04:25:59.340451	2017-08-25 01:32:30.321865
9	9	\N	2017-06-30 12:51:41.730166	2017-06-30 12:51:41.730166
4	4	\N	2017-06-28 05:26:10.063564	2017-08-26 00:26:52.109618
2	2	AgencyAdmin	2017-06-28 04:41:11.082948	2017-08-26 00:27:10.702042
11	11	\N	2017-07-16 12:11:45.20386	2017-07-16 12:11:45.20386
12	12	\N	2017-07-16 12:11:45.69024	2017-07-16 12:11:45.69024
8	8	\N	2017-06-30 06:09:48.468643	2017-07-03 16:44:05.039487
\.


--
-- Name: current_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('current_roles_id_seq', 22, true);


--
-- Data for Name: gods; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY gods (id, full_name, created_at, updated_at, user_id) FROM stdin;
1	Martin	2017-06-28 04:22:25.367745	2017-06-28 04:22:25.367745	1
\.


--
-- Name: gods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('gods_id_seq', 1, true);


--
-- Data for Name: guests; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY guests (id, user_id) FROM stdin;
\.


--
-- Name: guests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('guests_id_seq', 1, false);


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY images (id, maintenance_request_id, image_data, created_at, updated_at) FROM stdin;
1	1	{"id":"45b0e52d1ed48ead02845c60a095891e.jpeg","storage":"store","metadata":{"size":9396,"filename":"broken pipe.jpeg","mime_type":"image/jpeg"}}	2017-06-28 05:24:33.280792	2017-06-28 05:24:34.232967
2	1	{"id":"5b12612329ba2587bf94cd6307efeaa5.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-06-28 05:24:33.283723	2017-06-28 05:24:34.342009
3	2	{"id":"f53d02bb36fbf68e08705fb19f835ef0.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-06-28 05:27:11.099187	2017-06-28 05:27:11.526276
4	3	{"id":"0d4ab5f44b4ae4183e315aebc10ccb45.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-06-28 05:51:57.350257	2017-06-28 05:51:58.152174
5	4	{"id":"78527642c31368d464c89b966a32c965.jpg","storage":"store","metadata":{"size":112343,"filename":"roof-leaking-water-damage.jpg","mime_type":"image/jpeg"}}	2017-06-28 05:58:59.76067	2017-06-28 05:59:00.237795
6	5	{"id":"b8c6426ad3c6eb2777257da13a916ac9.jpeg","storage":"store","metadata":{"size":9396,"filename":"broken pipe.jpeg","mime_type":"image/jpeg"}}	2017-06-28 07:43:42.848879	2017-06-28 07:43:43.381905
7	5	{"id":"345eeeef51a0336e96885c60cc1e3490.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-06-28 07:43:42.85074	2017-06-28 07:43:43.567028
8	8	{"id":"61e723b48e8cf73028c7902fb5267aa0.jpeg","storage":"store","metadata":{"size":9396,"filename":"broken pipe.jpeg","mime_type":"image/jpeg"}}	2017-06-28 09:19:45.078591	2017-06-28 09:19:45.619704
9	9	{"id":"389c972b425d9cd10b434ee42dbaf81b.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-06-28 09:31:39.700726	2017-06-28 09:31:40.565178
10	10	{"id":"1690709f776c2aa78a9f988daea44c23.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-06-28 14:30:03.364966	2017-06-28 14:30:04.147493
11	12	{"id":"637fd99609a24ad950764f4c4eebbaa6.jpeg","storage":"store","metadata":{"size":9396,"filename":"broken pipe.jpeg","mime_type":"image/jpeg"}}	2017-06-28 14:52:47.864456	2017-06-28 14:52:48.781076
12	29	{"id":"5b5b6d8260ad16ed15be01cc35555df8.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-07-06 10:24:17.217587	2017-07-06 10:24:18.350423
13	30	{"id":"dd6d5552e3313fe6b34a9f85bfa36123.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-07-10 09:25:53.930835	2017-07-10 09:25:54.951661
14	57	{"id":"3f74064f8d55b09ec1434bc3e5d3f8c6.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-07-14 10:31:30.472811	2017-07-14 10:31:31.326139
15	59	{"id":"c29d3b3c123d42287f30e00e36a6f814.jpeg","storage":"store","metadata":{"size":9396,"filename":"broken pipe.jpeg","mime_type":"image/jpeg"}}	2017-07-16 14:15:15.469661	2017-07-16 14:15:16.345115
16	62	{"id":"cb1f9e761636ac91b540654de0485385.jpeg","storage":"store","metadata":{"size":9396,"filename":"broken pipe.jpeg","mime_type":"image/jpeg"}}	2017-07-19 16:54:00.692259	2017-07-19 16:54:06.800019
17	62	{"id":"75ecd71c9b62f1ea955b4c80bef6c997.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-07-19 16:54:00.695021	2017-07-19 16:54:07.23693
18	64	{"id":"5cd348fc89a511994c5837c2721cf82b.jpeg","storage":"store","metadata":{"size":9396,"filename":"broken pipe.jpeg","mime_type":"image/jpeg"}}	2017-07-25 16:05:12.2101	2017-07-25 16:05:15.239624
19	65	{"id":"6bbda417684c22c8ba1d973ba9cebe73.jpeg","storage":"store","metadata":{"size":9396,"filename":"broken pipe.jpeg","mime_type":"image/jpeg"}}	2017-07-25 20:15:48.674025	2017-07-25 20:15:50.734037
20	65	{"id":"ac7a7de3731b2d48edd5881d21484ee6.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-07-25 20:15:48.675682	2017-07-25 20:15:51.115504
21	72	{"id":"25ffab9bb9569ad9d6f8987a3252e2ab.png","storage":"store","metadata":{"size":204004,"filename":"Screen Shot 2017-07-26 at 2.37.47 AM.png","mime_type":"image/png"}}	2017-07-31 05:20:01.522661	2017-07-31 05:20:03.246166
22	73	{"id":"fd10bfb0bfe6ffd4a5da2d8b41ccdd81.jpg","storage":"store","metadata":{"size":3949171,"filename":"IMG_20170620_200840.jpg","mime_type":"image/jpeg"}}	2017-07-31 05:29:06.227782	2017-07-31 05:29:08.118772
23	74	{"id":"126bd55396329cfd882aba4a04d9912f.png","storage":"store","metadata":{"size":204004,"filename":"Screen Shot 2017-07-26 at 2.37.47 AM.png","mime_type":"image/png"}}	2017-07-31 05:33:57.33639	2017-07-31 05:33:59.753503
24	77	{"id":"eaa5e619bb2f476f43e86400fc5b93fc.jpeg","storage":"store","metadata":{"size":9396,"filename":"broken pipe.jpeg","mime_type":"image/jpeg"}}	2017-08-07 02:58:26.26933	2017-08-07 02:58:29.214954
25	77	{"id":"409a7e7a1a43ee2f871681756a069663.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-08-07 02:58:26.272129	2017-08-07 02:58:29.624977
26	79	{"id":"ddbdd3d1793eca1d1d2608ad5859839a.jpeg","storage":"store","metadata":{"size":9396,"filename":"broken pipe.jpeg","mime_type":"image/jpeg"}}	2017-08-08 05:00:19.47714	2017-08-08 05:00:21.469923
27	79	{"id":"26dc88d2a71e440375896d0a7d01e6e9.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-08-08 05:00:19.479793	2017-08-08 05:00:21.933979
28	81	{"id":"d46e2880ede4be5b993c4b2b2119402e.jpeg","storage":"store","metadata":{"size":9396,"filename":"broken pipe.jpeg","mime_type":"image/jpeg"}}	2017-08-08 23:31:50.178237	2017-08-08 23:31:52.098373
29	\N	\N	2017-08-15 04:41:52.845891	2017-08-15 04:41:52.845891
30	\N	\N	2017-08-15 04:41:57.093755	2017-08-15 04:41:57.093755
31	\N	\N	2017-08-15 04:41:59.690772	2017-08-15 04:41:59.690772
32	\N	\N	2017-08-15 04:42:09.918523	2017-08-15 04:42:09.918523
33	\N	\N	2017-08-15 04:42:43.278059	2017-08-15 04:42:43.278059
34	\N	\N	2017-08-15 04:45:48.503938	2017-08-15 04:45:48.503938
35	86	{"id":"984a944f32a8c083c13d5ad9e34a1726.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-08-15 05:08:18.71561	2017-08-15 05:08:20.950235
36	86	{"id":"bb1c36a0474f5d29d4b9dc66cd419d74.jpeg","storage":"store","metadata":{"size":9396,"filename":"broken pipe.jpeg","mime_type":"image/jpeg"}}	2017-08-15 05:08:18.720096	2017-08-15 05:08:21.290132
37	85	\N	2017-08-15 06:16:18.664708	2017-08-15 06:16:18.664708
38	85	\N	2017-08-15 06:41:35.715793	2017-08-15 06:41:35.715793
39	85	\N	2017-08-15 06:46:33.972244	2017-08-15 06:46:33.972244
40	85	\N	2017-08-15 06:47:33.4685	2017-08-15 06:47:33.4685
41	85	\N	2017-08-15 06:51:26.881359	2017-08-15 06:51:26.881359
42	85	\N	2017-08-15 06:55:20.12751	2017-08-15 06:55:20.12751
43	85	\N	2017-08-15 06:57:32.029046	2017-08-15 06:57:32.029046
44	85	{"id":"40d844f079630ed2db07899cdebe4cdf.jpg","storage":"store","metadata":{"size":263295,"filename":"IMG-20170801-WA0002.jpg","mime_type":"image/jpeg"}}	2017-08-15 09:03:41.835854	2017-08-15 09:03:43.627329
45	84	{"id":"72fa87a9a4bdef7c448f851e4c4b90e3.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-08-15 09:07:35.573899	2017-08-15 09:07:36.89911
46	84	{"id":"95d60e89e3291ab1201deaf2632b2d9d.jpeg","storage":"store","metadata":{"size":9396,"filename":"broken pipe.jpeg","mime_type":"image/jpeg"}}	2017-08-15 09:08:38.695228	2017-08-15 09:08:39.939119
47	83	{"id":"5f086c5959a2e7b12cf4eb480093d819.jpeg","storage":"store","metadata":{"size":9396,"filename":"broken pipe.jpeg","mime_type":"image/jpeg"}}	2017-08-16 03:32:31.81561	2017-08-16 03:32:33.818909
48	83	{"id":"5167c2d48888d96a5909a7832c15d708.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-08-16 03:34:52.756957	2017-08-16 03:34:54.18732
49	72	{"id":"bc0a542a003031d61b20bd3b5834771f.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-08-16 07:06:21.359089	2017-08-16 07:06:23.156811
50	71	{"id":"49ccc8885fd69cbc9f5932dc54085dc9.jpg","storage":"store","metadata":{"size":193400,"filename":"house.jpg","mime_type":"image/jpeg"}}	2017-08-21 07:03:29.233761	2017-08-21 07:03:31.593488
51	71	{"id":"525b1d470a91913bb6974b3acf1d2cc1.jpeg","storage":"store","metadata":{"size":9396,"filename":"broken pipe.jpeg","mime_type":"image/jpeg"}}	2017-08-21 07:03:58.641756	2017-08-21 07:04:00.293178
52	91	{"id":"c6bdd91572c840a39ae96fcbc690c60e.jpeg","storage":"store","metadata":{"size":9396,"filename":"broken pipe.jpeg","mime_type":"image/jpeg"}}	2017-08-22 02:30:36.416741	2017-08-22 02:30:38.400254
\.


--
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('images_id_seq', 52, true);


--
-- Data for Name: instructions; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY instructions (id, read_instruction, user_id, created_at, updated_at) FROM stdin;
1	f	16	2017-07-26 06:05:19.917412	2017-07-26 06:05:19.917412
3	t	18	2017-07-27 04:25:59.351551	2017-07-28 22:11:34.497338
4	f	19	2017-08-07 08:24:00.834985	2017-08-07 08:24:00.834985
5	f	20	2017-08-09 02:39:32.794715	2017-08-09 02:39:32.794715
6	f	21	2017-08-09 06:01:29.492965	2017-08-09 06:01:29.492965
7	f	22	2017-08-24 05:37:43.319579	2017-08-24 05:37:43.319579
\.


--
-- Name: instructions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('instructions_id_seq', 7, true);


--
-- Data for Name: invoice_items; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY invoice_items (id, invoice_id, item_description, amount, created_at, updated_at, pricing_type, hours, total_per_hour) FROM stdin;
1	1	table	500	2017-06-29 08:48:05.858411	2017-06-29 08:48:05.875963	Fixed Cost	1	500
2	1	cleaning	25	2017-06-29 08:48:05.860725	2017-06-29 08:48:05.879695	Hourly	4	100
3	2	table 2 	500	2017-06-29 08:48:05.864137	2017-06-29 08:48:05.906116	Fixed Cost	1	500
4	3	table	500	2017-06-29 08:55:45.933718	2017-06-29 08:55:45.948847	Fixed Cost	1	500
5	4	table	500	2017-07-13 06:05:40.484834	2017-07-13 06:05:40.497134	Fixed Cost	1	500
6	5	table 	500	2017-08-08 23:18:49.368803	2017-08-08 23:18:49.380538	Fixed Cost	1	500
\.


--
-- Name: invoice_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('invoice_items_id_seq', 6, true);


--
-- Data for Name: invoice_payments; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY invoice_payments (id, invoice_id, payment_status, amount_paid, created_at, updated_at, date) FROM stdin;
\.


--
-- Name: invoice_payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('invoice_payments_id_seq', 1, false);


--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY invoices (id, trady_id, maintenance_request_id, amount, created_at, updated_at, tax, ledger_id, gst_amount, due_date, delivery_status, print_status, invoice_number, trady_invoice_reference, paid) FROM stdin;
1	1	23	600	2017-06-29 08:48:05.856427	2017-06-29 08:48:15.772994	t	1	54.5450000000000017	2017-07-01	t	\N	\N	\N	f
2	1	23	500	2017-06-29 08:48:05.862438	2017-06-29 08:48:15.777769	t	1	45.4549999999999983	2017-07-01	t	\N	\N	\N	f
3	1	23	500	2017-06-29 08:55:45.930693	2017-06-29 08:55:57.817479	t	2	45.4549999999999983	2017-06-30	t	\N	\N	\N	f
4	1	30	500	2017-07-13 06:05:40.481842	2017-07-13 06:08:46.043037	t	3	45.4549999999999983	2017-07-20	t	\N	Ia6b2ad17a0	\N	f
5	1	66	500	2017-08-08 23:18:49.365504	2017-08-25 03:52:31.594341	t	4	45.4549999999999983	2017-08-22	t	\N	I42bd9049d9	\N	f
\.


--
-- Name: invoices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('invoices_id_seq', 5, true);


--
-- Data for Name: landlords; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY landlords (id, name, email, mobile, created_at, updated_at, user_id) FROM stdin;
1	bernard	bernard@email.com	12383289999	2017-06-28 06:00:54.047029	2017-07-10 09:42:06.562799	6
2	Tony Italian	tony@email.com	98345792385	2017-07-19 02:20:50.704028	2017-07-19 02:20:50.704028	13
3	americo	americo@email.com	28374569823	2017-08-07 08:24:00.853444	2017-08-07 08:24:00.853444	19
\.


--
-- Name: landlords_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('landlords_id_seq', 3, true);


--
-- Data for Name: ledgers; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY ledgers (id, grand_total, created_at, updated_at, maintenance_request_id, super_ledger_id) FROM stdin;
1	1100	2017-06-29 08:48:05.85267	2017-06-29 08:48:05.921858	23	\N
2	500	2017-06-29 08:55:45.92806	2017-06-29 08:55:45.965215	23	\N
3	500	2017-07-13 06:05:40.471987	2017-07-13 06:05:40.530891	30	\N
4	500	2017-08-08 23:18:49.353974	2017-08-08 23:18:49.415011	66	\N
\.


--
-- Name: ledgers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('ledgers_id_seq', 4, true);


--
-- Data for Name: logs; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY logs (id, maintenance_request_id, action, name, created_at, updated_at) FROM stdin;
1	1	Request Created	\N	2017-06-28 05:24:34.493862	2017-06-28 05:24:34.493862
2	1	Quote Requested	martin valencia	2017-06-28 05:26:10.113778	2017-06-28 05:26:10.113778
3	2	Request Created	\N	2017-06-28 05:27:11.606032	2017-06-28 05:27:11.606032
4	3	Request Created	\N	2017-06-28 05:51:58.227278	2017-06-28 05:51:58.227278
5	3	Quote Requested	martin valencia	2017-06-28 05:52:43.496542	2017-06-28 05:52:43.496542
6	4	Request Created	\N	2017-06-28 05:59:00.297751	2017-06-28 05:59:00.297751
7	4	Quote Requested	martin valencia	2017-06-28 05:59:32.04285	2017-06-28 05:59:32.04285
8	4	Maintenance request forwarded to landlord	bernard	2017-06-28 06:00:54.150197	2017-06-28 06:00:54.150197
9	5	Request Created	\N	2017-06-28 07:43:43.62612	2017-06-28 07:43:43.62612
10	6	Request Created	\N	2017-06-28 07:53:31.482431	2017-06-28 07:53:31.482431
11	7	Request Created	\N	2017-06-28 08:49:03.099645	2017-06-28 08:49:03.099645
12	8	Request Created	\N	2017-06-28 09:19:45.773864	2017-06-28 09:19:45.773864
13	9	Request Created	\N	2017-06-28 09:31:40.646762	2017-06-28 09:31:40.646762
14	9	Quote Requested	martin valencia	2017-06-28 09:44:26.186263	2017-06-28 09:44:26.186263
15	9	Quote has been Sent	handy man	2017-06-28 10:00:55.142877	2017-06-28 10:00:55.142877
16	9	Quote has been approved	martin valencia	2017-06-28 10:34:35.634973	2017-06-28 10:34:35.634973
17	9	Landlord suggested appointment time	bernard	2017-06-28 11:11:32.850668	2017-06-28 11:11:32.850668
18	9	Tradie requested an appointment.	handy man	2017-06-28 11:22:30.366938	2017-06-28 11:22:30.366938
19	10	Request Created	\N	2017-06-28 14:30:04.214539	2017-06-28 14:30:04.214539
20	11	Request Created	\N	2017-06-28 14:50:42.735678	2017-06-28 14:50:42.735678
21	12	Request Created	\N	2017-06-28 14:52:48.838467	2017-06-28 14:52:48.838467
22	13	Request Created	\N	2017-06-28 14:59:05.296921	2017-06-28 14:59:05.296921
23	14	Request Created	\N	2017-06-28 15:01:04.5273	2017-06-28 15:01:04.5273
24	15	Request Created	\N	2017-06-28 15:08:01.158961	2017-06-28 15:08:01.158961
25	16	Request Created	\N	2017-06-28 15:11:20.1705	2017-06-28 15:11:20.1705
26	17	Request Created	\N	2017-06-28 15:13:21.862961	2017-06-28 15:13:21.862961
27	18	Request Created	\N	2017-06-28 15:17:55.620137	2017-06-28 15:17:55.620137
28	19	Request Created	\N	2017-06-28 15:43:27.198696	2017-06-28 15:43:27.198696
29	19	Quote Requested	martin valencia	2017-06-28 15:47:42.888788	2017-06-28 15:47:42.888788
30	19	Quote Requested	martin valencia	2017-06-28 15:51:25.955447	2017-06-28 15:51:25.955447
31	19	Maintenance request forwarded to landlord	bernard	2017-06-28 18:38:21.276901	2017-06-28 18:38:21.276901
32	19	Work Order Requested	martin valencia	2017-06-28 18:38:47.518592	2017-06-28 18:38:47.518592
33	19	Work Order Requested	martin valencia	2017-06-28 18:39:34.23135	2017-06-28 18:39:34.23135
34	18	Quote Requested	martin valencia	2017-06-28 18:40:30.566136	2017-06-28 18:40:30.566136
35	18	Tradie requested an appointment.	handy man	2017-06-28 18:43:54.580175	2017-06-28 18:43:54.580175
36	18	Tenant requested a different appointment.	rita	2017-06-28 18:46:34.794523	2017-06-28 18:46:34.794523
37	18	Tradie requested an appointment.	handy man	2017-06-28 18:54:09.683038	2017-06-28 18:54:09.683038
38	20	Request Created	\N	2017-06-29 04:11:51.489136	2017-06-29 04:11:51.489136
39	21	Request Created	\N	2017-06-29 04:13:45.82161	2017-06-29 04:13:45.82161
40	22	Request Created	\N	2017-06-29 04:58:19.516072	2017-06-29 04:58:19.516072
41	23	Request Created	\N	2017-06-29 05:01:38.813437	2017-06-29 05:01:38.813437
42	24	Request Created	\N	2017-06-29 05:07:05.871701	2017-06-29 05:07:05.871701
43	24	Maintenance request forwarded to landlord	bernard	2017-06-29 05:44:39.724503	2017-06-29 05:44:39.724503
44	24	Quote Requested	martin valencia	2017-06-29 05:45:36.678723	2017-06-29 05:45:36.678723
45	24	Work Order Requested	martin valencia	2017-06-29 05:46:25.389487	2017-06-29 05:46:25.389487
46	23	Quote Requested	martin valencia	2017-06-29 05:47:44.951537	2017-06-29 05:47:44.951537
47	23	Quote has been Sent	handy man	2017-06-29 05:48:31.168045	2017-06-29 05:48:31.168045
48	23	Quote has been forwarded to landlord	martin valencia	2017-06-29 05:50:33.954125	2017-06-29 05:50:33.954125
49	23	Landlord Requests Quote	bernard	2017-06-29 05:51:10.192816	2017-06-29 05:51:10.192816
50	23	Quote has been approved	martin valencia	2017-06-29 06:06:01.840933	2017-06-29 06:06:01.840933
51	23	Tradie requested an appointment.	handy man	2017-06-29 06:09:16.385183	2017-06-29 06:09:16.385183
52	23	Tenant requested a different appointment.	rita	2017-06-29 06:19:40.131151	2017-06-29 06:19:40.131151
53	23	Tradie requested an appointment.	handy man	2017-06-29 06:39:58.119235	2017-06-29 06:39:58.119235
54	23	Tenant confirmed appointment	rita	2017-06-29 06:55:07.914271	2017-06-29 06:55:07.914271
55	23	Tradie requested an appointment.	handy man	2017-06-29 06:57:36.588421	2017-06-29 06:57:36.588421
56	23	Tenant requested a different appointment.	rita	2017-06-29 06:58:47.908638	2017-06-29 06:58:47.908638
57	23	Trady confirmed appointment	handy man	2017-06-29 07:13:23.090379	2017-06-29 07:13:23.090379
58	23	Tradie requested an appointment.	handy man	2017-06-29 07:26:14.939569	2017-06-29 07:26:14.939569
59	23	Tenant requested a different appointment.	rita	2017-06-29 07:29:31.152953	2017-06-29 07:29:31.152953
60	23	Trady confirmed appointment	handy man	2017-06-29 07:30:10.056797	2017-06-29 07:30:10.056797
61	23	Tenant confirmed appointment	rita	2017-06-29 07:32:11.513599	2017-06-29 07:32:11.513599
62	23	Trady confirmed appointment	handy man	2017-06-29 07:37:20.461901	2017-06-29 07:37:20.461901
63	23	Maintenance request forwarded to landlord	bernard	2017-06-29 07:46:45.980034	2017-06-29 07:46:45.980034
64	23	Landlord suggested appointment time	bernard	2017-06-29 07:47:26.770488	2017-06-29 07:47:26.770488
65	23	Landlord suggested appointment time	bernard	2017-06-29 07:51:41.207615	2017-06-29 07:51:41.207615
66	23	Landlord suggested appointment time	bernard	2017-06-29 07:52:59.880731	2017-06-29 07:52:59.880731
67	23	Landlord suggested appointment time	bernard	2017-06-29 07:53:55.84685	2017-06-29 07:53:55.84685
68	23	Landlord suggested appointment time	bernard	2017-06-29 07:54:39.764648	2017-06-29 07:54:39.764648
69	23	Landlord suggested appointment time	bernard	2017-06-29 07:58:39.176601	2017-06-29 07:58:39.176601
70	23	Landlord suggested appointment time	bernard	2017-06-29 07:59:14.681098	2017-06-29 07:59:14.681098
71	23	Tenant suggested appointment time	rita	2017-06-29 08:03:53.970765	2017-06-29 08:03:53.970765
72	23	Landlord suggested appointment time	bernard	2017-06-29 08:04:40.749699	2017-06-29 08:04:40.749699
73	23	Tenant suggested appointment time	rita	2017-06-29 08:07:24.438699	2017-06-29 08:07:24.438699
74	23	Landlord suggested appointment time	bernard	2017-06-29 08:08:04.654313	2017-06-29 08:08:04.654313
75	23	Tenant suggested appointment time	rita	2017-06-29 08:09:47.383355	2017-06-29 08:09:47.383355
76	23	Landlord suggested appointment time	bernard	2017-06-29 08:10:37.999804	2017-06-29 08:10:37.999804
77	25	Request Created	\N	2017-06-29 08:35:48.202434	2017-06-29 08:35:48.202434
78	23	Invoice created	handy man	2017-06-29 08:48:15.739419	2017-06-29 08:48:15.739419
79	23	Invoice created	handy man	2017-06-29 08:55:57.778827	2017-06-29 08:55:57.778827
80	23	Invoice created	handy man	2017-06-29 08:57:42.843799	2017-06-29 08:57:42.843799
81	23	Maintenance request forwarded to landlord	bernard	2017-06-29 12:47:27.708394	2017-06-29 12:47:27.708394
82	23	Landlord suggested appointment time	bernard	2017-06-29 12:48:31.604139	2017-06-29 12:48:31.604139
83	25	Quote Requested	Agent smith	2017-06-30 11:22:27.828536	2017-06-30 11:22:27.828536
84	25	Tradie requested an appointment.	handy man	2017-06-30 11:26:49.215813	2017-06-30 11:26:49.215813
85	25	Tenant confirmed appointment	rita	2017-06-30 11:28:09.329747	2017-06-30 11:28:09.329747
86	26	Request Created	\N	2017-06-30 12:41:02.640532	2017-06-30 12:41:02.640532
87	27	Request Created	\N	2017-06-30 12:51:41.934161	2017-06-30 12:51:41.934161
88	23	Tradie requested an appointment.	handy man	2017-07-03 08:44:13.462721	2017-07-03 08:44:13.462721
89	23	Tradie requested an appointment.	handy man	2017-07-03 09:21:28.094087	2017-07-03 09:21:28.094087
90	23	Tradie requested an appointment.	handy man	2017-07-03 09:26:26.905212	2017-07-03 09:26:26.905212
91	23	Tradie requested an appointment.	handy man	2017-07-03 09:32:33.052598	2017-07-03 09:32:33.052598
92	26	Landlord suggested appointment time	bernard	2017-07-03 13:34:00.73146	2017-07-03 13:34:00.73146
93	26	Tenant confirmed appointment	rita	2017-07-03 13:40:41.485779	2017-07-03 13:40:41.485779
94	26	Tenant suggested appointment time	rita	2017-07-03 13:41:18.717203	2017-07-03 13:41:18.717203
95	26	Landlord confirmed appointment	bernard	2017-07-03 13:48:00.496936	2017-07-03 13:48:00.496936
96	26	Landlord suggested appointment time	bernard	2017-07-03 13:48:22.631819	2017-07-03 13:48:22.631819
97	26	Tenant confirmed appointment	rita	2017-07-03 13:53:39.691417	2017-07-03 13:53:39.691417
98	26	Tenant suggested appointment time	rita	2017-07-03 13:54:12.908964	2017-07-03 13:54:12.908964
100	26	Tenant suggested appointment time	rita	2017-07-03 13:59:38.670411	2017-07-03 13:59:38.670411
101	26	Tenant suggested appointment time	rita	2017-07-03 14:00:50.717212	2017-07-03 14:00:50.717212
103	25	Quote has been Sent	handy man	2017-07-03 16:25:37.583451	2017-07-03 16:25:37.583451
104	25	Quote has been Sent	handy man	2017-07-03 16:31:42.653501	2017-07-03 16:31:42.653501
108	25	Quote has been declined	martin valencia	2017-07-03 16:59:22.159113	2017-07-03 16:59:22.159113
109	25	Quote has been declined	martin valencia	2017-07-03 16:59:36.493719	2017-07-03 16:59:36.493719
110	25	Quote has been approved	martin valencia	2017-07-03 17:00:01.96456	2017-07-03 17:00:01.96456
111	25	Quote has been cancelled	martin valencia	2017-07-03 17:02:01.329261	2017-07-03 17:02:01.329261
112	25	Quote has been approved	martin valencia	2017-07-03 17:02:53.095144	2017-07-03 17:02:53.095144
115	25	Quote has been cancelled	martin valencia	2017-07-03 17:06:45.352834	2017-07-03 17:06:45.352834
116	25	Quote has been approved	martin valencia	2017-07-03 17:06:58.051618	2017-07-03 17:06:58.051618
99	26	Tenant suggested appointment time	rita	2017-07-03 13:57:13.048086	2017-07-03 13:57:13.048086
102	26	Landlord suggested appointment time	bernard	2017-07-03 14:02:28.328388	2017-07-03 14:02:28.328388
105	25	Quote has been Sent	handy man	2017-07-03 16:40:32.606648	2017-07-03 16:40:32.606648
106	25	Quote has been approved	martin valencia	2017-07-03 16:56:18.500371	2017-07-03 16:56:18.500371
107	25	Quote has been cancelled	martin valencia	2017-07-03 16:58:33.487978	2017-07-03 16:58:33.487978
113	25	Quote has been cancelled	martin valencia	2017-07-03 17:04:23.026407	2017-07-03 17:04:23.026407
114	25	Quote has been approved	martin valencia	2017-07-03 17:04:42.730237	2017-07-03 17:04:42.730237
117	28	Request Created	\N	2017-07-04 17:00:59.004417	2017-07-04 17:00:59.004417
118	28	Quote Requested	martin valencia	2017-07-04 17:01:29.584059	2017-07-04 17:01:29.584059
119	28	Tradie requested an appointment.	handy man	2017-07-04 17:02:37.485706	2017-07-04 17:02:37.485706
120	28	Tenant requested a different appointment.	rita	2017-07-04 17:03:23.062052	2017-07-04 17:03:23.062052
121	28	Tenant requested a different appointment.	rita	2017-07-04 17:08:52.692491	2017-07-04 17:08:52.692491
122	28	Tenant requested a different appointment.	rita	2017-07-04 17:12:10.251295	2017-07-04 17:12:10.251295
123	28	Tenant requested a different appointment.	rita	2017-07-05 03:05:32.156643	2017-07-05 03:05:32.156643
124	28	Maintenance request forwarded to landlord	bernard	2017-07-05 03:24:19.768703	2017-07-05 03:24:19.768703
125	28	Landlord suggested appointment time	bernard	2017-07-05 03:24:46.674875	2017-07-05 03:24:46.674875
126	28	Tenant suggested appointment time	rita	2017-07-05 03:25:20.992485	2017-07-05 03:25:20.992485
127	28	Landlord suggested appointment time	bernard	2017-07-05 03:27:14.680073	2017-07-05 03:27:14.680073
128	28	Tenant suggested appointment time	rita	2017-07-05 03:27:54.644799	2017-07-05 03:27:54.644799
129	28	Landlord suggested appointment time	bernard	2017-07-05 03:32:03.368645	2017-07-05 03:32:03.368645
130	28	Tenant suggested appointment time	rita	2017-07-05 03:36:36.599306	2017-07-05 03:36:36.599306
131	28	Landlord suggested appointment time	bernard	2017-07-05 03:44:53.029821	2017-07-05 03:44:53.029821
132	28	Tenant suggested appointment time	rita	2017-07-05 03:45:45.8777	2017-07-05 03:45:45.8777
133	28	Landlord suggested appointment time	bernard	2017-07-05 04:11:22.020434	2017-07-05 04:11:22.020434
134	28	Tenant suggested appointment time	rita	2017-07-05 04:12:21.045744	2017-07-05 04:12:21.045744
135	28	Landlord suggested appointment time	bernard	2017-07-05 04:13:49.600484	2017-07-05 04:13:49.600484
136	28	Tenant suggested appointment time	rita	2017-07-05 04:15:29.718989	2017-07-05 04:15:29.718989
137	28	Landlord suggested appointment time	bernard	2017-07-05 05:05:01.123447	2017-07-05 05:05:01.123447
138	28	Tenant suggested appointment time	rita	2017-07-05 05:05:50.74415	2017-07-05 05:05:50.74415
139	1	Quote has been Sent	handy man	2017-07-05 07:14:42.380438	2017-07-05 07:14:42.380438
140	1	Quote Requested	martin valencia	2017-07-05 07:23:42.797761	2017-07-05 07:23:42.797761
141	1	Quote has been Sent	elon	2017-07-05 07:25:05.325265	2017-07-05 07:25:05.325265
142	27	Quote Requested	martin valencia	2017-07-05 07:27:11.198182	2017-07-05 07:27:11.198182
143	27	Quote has been Sent	handy man	2017-07-05 07:27:49.027752	2017-07-05 07:27:49.027752
144	28	Maintenance request forwarded to landlord	bernard	2017-07-06 03:43:17.287387	2017-07-06 03:43:17.287387
145	1	Quote has been approved	martin valencia	2017-07-06 06:44:49.55308	2017-07-06 06:44:49.55308
146	22	Maintenance request forwarded to landlord	bernard	2017-07-06 09:15:34.265629	2017-07-06 09:15:34.265629
147	29	Request Created	\N	2017-07-06 10:24:18.466761	2017-07-06 10:24:18.466761
148	29	Quote Requested	martin valencia	2017-07-07 07:23:19.595522	2017-07-07 07:23:19.595522
149	29	Quote has been Sent	handy man	2017-07-07 07:36:44.48966	2017-07-07 07:36:44.48966
150	29	Quote has been approved	martin valencia	2017-07-07 07:38:34.078869	2017-07-07 07:38:34.078869
151	29	Quote has been declined	martin valencia	2017-07-07 07:41:32.682041	2017-07-07 07:41:32.682041
152	29	Quote has been approved	martin valencia	2017-07-07 07:47:36.752925	2017-07-07 07:47:36.752925
153	29	Tradie requested an appointment.	handy man	2017-07-07 07:49:38.862652	2017-07-07 07:49:38.862652
154	29	Tradie requested an appointment.	handy man	2017-07-07 07:51:09.598513	2017-07-07 07:51:09.598513
155	30	Request Created	\N	2017-07-10 09:25:55.038057	2017-07-10 09:25:55.038057
156	30	Quote Requested	martin valencia	2017-07-10 09:37:45.423646	2017-07-10 09:37:45.423646
157	30	Maintenance request forwarded to landlord	bernard	2017-07-10 09:39:00.367595	2017-07-10 09:39:00.367595
158	30	Quote Requested	martin valencia	2017-07-10 11:34:20.464475	2017-07-10 11:34:20.464475
159	30	Tradie requested an appointment.	elon	2017-07-10 11:50:08.899625	2017-07-10 11:50:08.899625
160	30	Tenant requested a different appointment.	rita	2017-07-10 12:12:00.429777	2017-07-10 12:12:00.429777
161	30	Quote has been Sent	elon	2017-07-10 12:28:39.327941	2017-07-10 12:28:39.327941
162	30	Quote has been declined	martin valencia	2017-07-10 12:32:47.601812	2017-07-10 12:32:47.601812
163	30	Quote has been approved	martin valencia	2017-07-10 12:34:07.159263	2017-07-10 12:34:07.159263
164	30	Quote has been declined	martin valencia	2017-07-10 12:34:54.893005	2017-07-10 12:34:54.893005
165	30	Quote has been approved	martin valencia	2017-07-10 12:35:19.810322	2017-07-10 12:35:19.810322
166	30	Quote has been forwarded to landlord	martin valencia	2017-07-10 12:35:48.124488	2017-07-10 12:35:48.124488
167	30	Quote has been forwarded to landlord	martin valencia	2017-07-10 12:39:57.418929	2017-07-10 12:39:57.418929
168	30	Quote has been declined	martin valencia	2017-07-10 12:41:05.63263	2017-07-10 12:41:05.63263
169	30	Quote has been approved	martin valencia	2017-07-10 12:44:08.94434	2017-07-10 12:44:08.94434
170	30	Landlord suggested appointment time	bernard	2017-07-10 12:48:03.717996	2017-07-10 12:48:03.717996
171	30	Tenant suggested appointment time	rita	2017-07-10 12:49:21.916395	2017-07-10 12:49:21.916395
172	30	Landlord suggested appointment time	bernard	2017-07-10 13:13:31.653003	2017-07-10 13:13:31.653003
173	30	Tenant suggested appointment time	rita	2017-07-10 13:14:25.647211	2017-07-10 13:14:25.647211
174	30	Quote has been cancelled	martin valencia	2017-07-10 13:19:01.996117	2017-07-10 13:19:01.996117
175	30	Quote has been approved	martin valencia	2017-07-10 13:30:10.890024	2017-07-10 13:30:10.890024
176	30	Quote has been cancelled	martin valencia	2017-07-10 13:31:02.42982	2017-07-10 13:31:02.42982
177	31	Request Created	\N	2017-07-11 08:45:53.500928	2017-07-11 08:45:53.500928
178	32	Request Created	\N	2017-07-12 08:43:37.546084	2017-07-12 08:43:37.546084
179	33	Request Created	\N	2017-07-12 08:46:42.114247	2017-07-12 08:46:42.114247
180	34	Request Created	\N	2017-07-12 08:57:12.230712	2017-07-12 08:57:12.230712
181	36	Request Created	\N	2017-07-12 09:43:59.920503	2017-07-12 09:43:59.920503
182	37	Request Created	\N	2017-07-12 09:48:16.664064	2017-07-12 09:48:16.664064
183	38	Request Created	\N	2017-07-12 09:51:10.080224	2017-07-12 09:51:10.080224
184	39	Request Created	\N	2017-07-12 09:56:59.62573	2017-07-12 09:56:59.62573
185	40	Request Created	\N	2017-07-12 10:00:34.04335	2017-07-12 10:00:34.04335
186	41	Request Created	\N	2017-07-12 10:28:38.348158	2017-07-12 10:28:38.348158
187	42	Request Created	\N	2017-07-12 10:31:15.738936	2017-07-12 10:31:15.738936
188	43	Request Created	\N	2017-07-12 13:46:17.71945	2017-07-12 13:46:17.71945
189	44	Request Created	\N	2017-07-12 13:49:33.229589	2017-07-12 13:49:33.229589
190	45	Request Created	\N	2017-07-12 14:21:24.769003	2017-07-12 14:21:24.769003
191	46	Request Created	\N	2017-07-12 14:31:09.808438	2017-07-12 14:31:09.808438
192	47	Request Created	\N	2017-07-12 14:37:08.902417	2017-07-12 14:37:08.902417
193	30	Tradie requested an appointment.	handy man	2017-07-13 03:01:59.894604	2017-07-13 03:01:59.894604
194	30	Quote has been Sent	handy man	2017-07-13 03:16:10.971249	2017-07-13 03:16:10.971249
195	30	Quote has been forwarded to landlord	martin valencia	2017-07-13 03:54:03.546814	2017-07-13 03:54:03.546814
196	30	Quote has been forwarded to landlord	martin valencia	2017-07-13 03:54:23.130414	2017-07-13 03:54:23.130414
197	30	Quote has been forwarded to landlord	martin valencia	2017-07-13 03:56:39.279253	2017-07-13 03:56:39.279253
198	30	Quote has been forwarded to landlord	martin valencia	2017-07-13 04:00:21.548612	2017-07-13 04:00:21.548612
199	30	Quote has been approved	martin valencia	2017-07-13 04:14:36.016568	2017-07-13 04:14:36.016568
200	30	Invoice created	handy man	2017-07-13 06:08:46.010708	2017-07-13 06:08:46.010708
201	48	Request Created	\N	2017-07-14 07:31:51.021752	2017-07-14 07:31:51.021752
202	49	Request Created	\N	2017-07-14 07:38:21.767727	2017-07-14 07:38:21.767727
203	50	Request Created	\N	2017-07-14 07:40:44.344751	2017-07-14 07:40:44.344751
204	51	Request Created	\N	2017-07-14 07:44:05.624722	2017-07-14 07:44:05.624722
205	52	Request Created	\N	2017-07-14 08:03:57.886751	2017-07-14 08:03:57.886751
206	53	Request Created	\N	2017-07-14 08:07:44.903057	2017-07-14 08:07:44.903057
207	54	Request Created	\N	2017-07-14 08:09:57.024856	2017-07-14 08:09:57.024856
208	55	Request Created	\N	2017-07-14 08:11:21.655674	2017-07-14 08:11:21.655674
209	56	Request Created	\N	2017-07-14 08:12:48.25494	2017-07-14 08:12:48.25494
210	57	Request Created	\N	2017-07-14 10:31:31.395006	2017-07-14 10:31:31.395006
211	30	Quote Requested	martin valencia	2017-07-16 11:43:45.086646	2017-07-16 11:43:45.086646
212	57	Quote Requested	martin valencia	2017-07-16 11:46:04.653992	2017-07-16 11:46:04.653992
213	58	Request Created	\N	2017-07-16 12:11:45.7553	2017-07-16 12:11:45.7553
214	59	Request Created	\N	2017-07-16 14:15:16.48504	2017-07-16 14:15:16.48504
215	60	Request Created	\N	2017-07-16 15:38:28.100918	2017-07-16 15:38:28.100918
216	61	Request Created	\N	2017-07-16 15:39:32.256883	2017-07-16 15:39:32.256883
217	61	Maintenance request forwarded to landlord	Tony Italian	2017-07-19 02:20:50.798279	2017-07-19 02:20:50.798279
218	61	Quote Requested	martin valencia	2017-07-19 02:49:40.549657	2017-07-19 02:49:40.549657
219	61	Tradie requested an appointment.	handy man	2017-07-19 12:56:14.301403	2017-07-19 12:56:14.301403
220	62	Request Created	\N	2017-07-19 16:54:07.351776	2017-07-19 16:54:07.351776
221	62	Maintenance request forwarded to landlord	bernard	2017-07-19 17:04:05.998605	2017-07-19 17:04:05.998605
222	62	Quote Requested	martin valencia	2017-07-19 17:04:39.007244	2017-07-19 17:04:39.007244
223	62	Work Order Requested	martin valencia	2017-07-19 17:07:15.331633	2017-07-19 17:07:15.331633
224	62	Maintenance request forwarded to landlord	bernard	2017-07-19 18:17:07.475935	2017-07-19 18:17:07.475935
225	60	Maintenance request forwarded to landlord	bernard	2017-07-19 18:17:47.383672	2017-07-19 18:17:47.383672
226	60	Maintenance request forwarded to landlord	bernard	2017-07-19 18:18:04.698447	2017-07-19 18:18:04.698447
227	61	Quote Requested	martin valencia	2017-07-19 18:52:18.318152	2017-07-19 18:52:18.318152
228	61	Tradie requested an appointment.	elon	2017-07-19 18:56:45.718302	2017-07-19 18:56:45.718302
229	63	Request Created	\N	2017-07-21 02:45:05.545817	2017-07-21 02:45:05.545817
230	62	Quote Requested	martin valencia	2017-07-24 02:55:56.511836	2017-07-24 02:55:56.511836
231	64	Request Created	\N	2017-07-25 16:05:15.440512	2017-07-25 16:05:15.440512
232	64	Maintenance request forwarded to landlord	Tony Italian	2017-07-25 16:06:07.367634	2017-07-25 16:06:07.367634
233	64	Landlord Requests Quote	Tony Italian	2017-07-25 16:06:41.987897	2017-07-25 16:06:41.987897
234	64	Quote Requested	martin valencia	2017-07-25 16:08:06.67569	2017-07-25 16:08:06.67569
235	64	Quote has been Sent	handy man	2017-07-25 16:09:10.20338	2017-07-25 16:09:10.20338
236	65	Request Created	\N	2017-07-25 20:15:51.22099	2017-07-25 20:15:51.22099
237	65	Maintenance request forwarded to landlord	bernard	2017-07-25 20:47:13.388176	2017-07-25 20:47:13.388176
238	65	Maintenance request forwarded to landlord	bernard	2017-07-25 20:56:38.046007	2017-07-25 20:56:38.046007
239	65	Landlord Requests Quote	bernard	2017-07-25 20:56:50.527051	2017-07-25 20:56:50.527051
240	65	Landlord Requests Quote	bernard	2017-07-25 21:03:48.133994	2017-07-25 21:03:48.133994
241	65	Quote Requested	martin valencia	2017-07-25 21:13:21.998841	2017-07-25 21:13:21.998841
242	65	Quote Requested	martin valencia	2017-07-25 21:17:01.709319	2017-07-25 21:17:01.709319
243	65	Tradie requested an appointment.	handy man	2017-07-25 21:56:25.776903	2017-07-25 21:56:25.776903
244	65	Tradie requested an appointment.	handy man	2017-07-25 22:04:36.762762	2017-07-25 22:04:36.762762
245	65	Tradie requested an appointment.	handy man	2017-07-25 22:06:36.733025	2017-07-25 22:06:36.733025
246	65	Tenant requested a different appointment.	rita	2017-07-25 22:17:16.876481	2017-07-25 22:17:16.876481
247	65	Tradie requested an appointment.	handy man	2017-07-25 22:20:10.154965	2017-07-25 22:20:10.154965
248	65	Tenant confirmed appointment	rita	2017-07-25 22:38:29.790418	2017-07-25 22:38:29.790418
249	65	Quote has been Sent	handy man	2017-07-25 23:05:36.659514	2017-07-25 23:05:36.659514
250	65	Quote Requested	martin valencia	2017-07-25 23:15:49.27376	2017-07-25 23:15:49.27376
251	65	Quote has been Sent	electro	2017-07-25 23:20:25.305042	2017-07-25 23:20:25.305042
252	65	Quote has been forwarded to landlord	martin valencia	2017-07-25 23:27:29.014179	2017-07-25 23:27:29.014179
253	65	Quote has been forwarded to landlord	martin valencia	2017-07-25 23:29:33.849769	2017-07-25 23:29:33.849769
254	65	Quote has been forwarded to landlord	martin valencia	2017-07-25 23:31:22.774924	2017-07-25 23:31:22.774924
255	65	Quote has been forwarded to landlord	martin valencia	2017-07-25 23:35:55.439728	2017-07-25 23:35:55.439728
256	65	Quote has been forwarded to landlord	martin valencia	2017-07-25 23:39:35.543306	2017-07-25 23:39:35.543306
257	65	Quote has been forwarded to landlord	martin valencia	2017-07-25 23:44:10.532014	2017-07-25 23:44:10.532014
258	65	Quote has been approved	martin valencia	2017-07-25 23:58:08.089268	2017-07-25 23:58:08.089268
259	65	Tradie requested an appointment.	handy man	2017-07-26 00:13:46.447409	2017-07-26 00:13:46.447409
260	65	Tenant requested a different appointment.	rita	2017-07-26 00:16:22.518403	2017-07-26 00:16:22.518403
261	65	Trady confirmed appointment	handy man	2017-07-26 00:18:14.032759	2017-07-26 00:18:14.032759
262	65	Tradie requested an appointment.	handy man	2017-07-26 00:27:19.419016	2017-07-26 00:27:19.419016
263	65	Tenant confirmed appointment	rita	2017-07-26 00:27:55.014328	2017-07-26 00:27:55.014328
264	65	Tenant requested a different appointment.	rita	2017-07-26 00:28:30.113027	2017-07-26 00:28:30.113027
265	66	Request Created	\N	2017-07-26 00:34:22.436032	2017-07-26 00:34:22.436032
266	66	Work Order Requested	martin valencia	2017-07-26 00:37:11.636287	2017-07-26 00:37:11.636287
267	67	Request Created	\N	2017-07-26 00:49:47.518969	2017-07-26 00:49:47.518969
268	68	Request Created	\N	2017-07-26 00:56:32.617315	2017-07-26 00:56:32.617315
269	69	Request Created	\N	2017-07-26 06:05:20.315895	2017-07-26 06:05:20.315895
270	70	Request Created	\N	2017-07-27 04:27:44.966223	2017-07-27 04:27:44.966223
271	71	Request Created	\N	2017-07-28 07:45:43.022651	2017-07-28 07:45:43.022651
272	74	Request Created	\N	2017-07-31 05:33:59.83813	2017-07-31 05:33:59.83813
273	75	Request Created	\N	2017-07-31 20:59:24.931863	2017-07-31 20:59:24.931863
274	76	Maintenance request created.	\N	2017-08-07 02:42:06.282627	2017-08-07 02:42:06.282627
275	77	Maintenance request created.	\N	2017-08-07 02:58:29.86924	2017-08-07 02:58:29.86924
276	66	Invoice has been uploaded	\N	2017-08-07 03:52:55.168629	2017-08-07 03:52:55.168629
277	66	Tradie requested an appointment. - Tradie: 	Handy man	2017-08-07 04:55:03.99188	2017-08-07 04:55:03.99188
278	66	Tradie requested an appointment. - Tradie: 	Handy man	2017-08-07 04:57:28.923512	2017-08-07 04:57:28.923512
279	78	Maintenance request created.	\N	2017-08-07 08:20:35.764462	2017-08-07 08:20:35.764462
280	78	Maintenance request forwarded to landlord - Landlord 	Americo	2017-08-07 08:24:00.943368	2017-08-07 08:24:00.943368
281	78	Maintenance request forwarded to landlord - Landlord: 	Americo	2017-08-07 08:45:25.937417	2017-08-07 08:45:25.937417
282	78	Maintenance request forwarded to landlord - Landlord: 	Bernard	2017-08-07 08:48:38.700807	2017-08-07 08:48:38.700807
283	78	Maintenance request forwarded to landlord - Landlord: 	Americo	2017-08-07 08:50:18.029027	2017-08-07 08:50:18.029027
284	78	Maintenance request forwarded to landlord - Landlord: 	Americo	2017-08-07 09:11:49.618138	2017-08-07 09:11:49.618138
285	78	Maintenance request forwarded to landlord - Landlord: 	Americo	2017-08-07 09:20:21.264382	2017-08-07 09:20:21.264382
286	78	Maintenance request forwarded to landlord - Landlord: 	Americo	2017-08-08 01:51:50.192724	2017-08-08 01:51:50.192724
287	78	Maintenance request forwarded to landlord - Landlord: 	Americo	2017-08-08 02:08:23.727723	2017-08-08 02:08:23.727723
288	66	Tradie requested an appointment. - Tradie: 	Handy man	2017-08-08 04:43:52.207953	2017-08-08 04:43:52.207953
289	66	Tradie requested an appointment. - Tradie: 	Handy man	2017-08-08 04:45:10.131869	2017-08-08 04:45:10.131869
290	79	Maintenance request created.	\N	2017-08-08 05:00:22.058599	2017-08-08 05:00:22.058599
291	80	Maintenance request created.	\N	2017-08-08 05:10:09.142004	2017-08-08 05:10:09.142004
292	80	Maintenance request forwarded to landlord - Landlord: 	Bernard	2017-08-08 05:33:54.25567	2017-08-08 05:33:54.25567
293	80	Landlord Requests Quote - Landlord: 	Bernard	2017-08-08 05:36:46.124972	2017-08-08 05:36:46.124972
294	80	Landlord suggested appointment time - Landlord	Bernard	2017-08-08 05:39:51.307367	2017-08-08 05:39:51.307367
295	66	Tradie requested an appointment. - Tradie: 	Handy man	2017-08-08 06:39:35.671075	2017-08-08 06:39:35.671075
296	66	Tradie requested an appointment. - Tradie: 	Handy man	2017-08-08 06:56:43.046241	2017-08-08 06:56:43.046241
297	66	Tradie requested an appointment. - Tradie: 	Handy man	2017-08-08 07:06:15.246493	2017-08-08 07:06:15.246493
298	80	Landlord suggested appointment time - Landlord	Bernard	2017-08-08 07:41:24.739208	2017-08-08 07:41:24.739208
299	80	Landlord Requests Quote - Landlord: 	Bernard	2017-08-08 07:41:53.509583	2017-08-08 07:41:53.509583
300	80	Tenant suggested appointment time - Tenant: 	Rita	2017-08-08 07:43:20.175305	2017-08-08 07:43:20.175305
301	80	Landlord suggested appointment time - Landlord	Bernard	2017-08-08 07:44:46.690059	2017-08-08 07:44:46.690059
302	80	Tenant confirmed appointment - Tenant: 	Rita	2017-08-08 07:45:20.228946	2017-08-08 07:45:20.228946
303	80	Quote requested by: 	Martin Valencia	2017-08-08 07:46:59.939482	2017-08-08 07:46:59.939482
304	79	Quote requested by: 	Martin Valencia	2017-08-08 08:16:58.250472	2017-08-08 08:16:58.250472
305	66	Quote has been sent by: 	Handy man	2017-08-08 08:47:54.553584	2017-08-08 08:47:54.553584
306	66	Invoice created by - Tradie: 	Handy man	2017-08-08 23:19:11.215509	2017-08-08 23:19:11.215509
307	81	Maintenance request created.	\N	2017-08-08 23:31:52.238728	2017-08-08 23:31:52.238728
308	81	Maintenance request forwarded to landlord - Landlord: 	Americo	2017-08-08 23:46:38.945745	2017-08-08 23:46:38.945745
309	81	Landlord Requests Quote - Landlord: 	Americo	2017-08-08 23:47:17.227138	2017-08-08 23:47:17.227138
310	81	Quote requested by: 	Martin Valencia	2017-08-08 23:47:52.980275	2017-08-08 23:47:52.980275
311	81	Quote requested by: 	Martin Valencia	2017-08-08 23:48:28.129399	2017-08-08 23:48:28.129399
312	81	Tradie requested an appointment. - Tradie: 	Elon	2017-08-08 23:49:20.261057	2017-08-08 23:49:20.261057
313	81	Quote has been sent by: 	Elon	2017-08-08 23:50:09.480312	2017-08-08 23:50:09.480312
314	81	Tenant requested a different appointment. - Tenant: 	Rita	2017-08-08 23:52:19.107619	2017-08-08 23:52:19.107619
315	81	Trady confirmed appointment - Tradie: 	Elon	2017-08-08 23:53:45.349529	2017-08-08 23:53:45.349529
316	81	Quote has been forwarded to landlord by: 	Martin Valencia	2017-08-08 23:54:23.560317	2017-08-08 23:54:23.560317
317	81	Landlord Requests Quote - Landlord: 	Americo	2017-08-08 23:55:03.649498	2017-08-08 23:55:03.649498
318	81	Quote requested by: 	Martin Valencia	2017-08-08 23:55:28.634317	2017-08-08 23:55:28.634317
319	81	Quote has been sent by: 	Electro	2017-08-09 00:01:57.00794	2017-08-09 00:01:57.00794
320	81	Quote has been declined by: 	Martin Valencia	2017-08-09 00:05:06.851895	2017-08-09 00:05:06.851895
321	81	Quote has been approved by: 	Martin Valencia	2017-08-09 00:07:58.994305	2017-08-09 00:07:58.994305
322	81	Tradie requested an appointment. - Tradie: 	Elon	2017-08-09 00:14:00.709572	2017-08-09 00:14:00.709572
323	81	Tenant confirmed appointment - Tenant: 	Rita	2017-08-09 00:17:26.755439	2017-08-09 00:17:26.755439
324	81	Landlord suggested appointment time - Landlord	Americo	2017-08-09 00:19:03.355408	2017-08-09 00:19:03.355408
325	81	Tenant suggested appointment time - Tenant: 	Rita	2017-08-09 00:19:37.337601	2017-08-09 00:19:37.337601
326	81	Landlord suggested appointment time - Landlord	Americo	2017-08-09 00:20:41.297581	2017-08-09 00:20:41.297581
327	81	Tenant confirmed appointment - Tenant: 	Rita	2017-08-09 00:21:58.636497	2017-08-09 00:21:58.636497
328	81	Landlord suggested appointment time - Landlord	Americo	2017-08-09 00:22:56.042793	2017-08-09 00:22:56.042793
329	81	Tradie requested an appointment. - Tradie: 	Elon	2017-08-09 00:25:54.208044	2017-08-09 00:25:54.208044
330	81	Tenant confirmed appointment - Tenant: 	Rita	2017-08-09 00:26:32.113354	2017-08-09 00:26:32.113354
331	81	Tenant requested a different appointment. - Tenant: 	Rita	2017-08-09 00:26:53.083937	2017-08-09 00:26:53.083937
332	81	Trady confirmed appointment - Tradie: 	Elon	2017-08-09 00:31:50.45384	2017-08-09 00:31:50.45384
333	77	Quote requested by: 	Martin Valencia	2017-08-09 02:39:32.878051	2017-08-09 02:39:32.878051
334	76	Quote requested by: 	Martin Valencia	2017-08-09 06:37:18.847252	2017-08-09 06:37:18.847252
335	82	Maintenance request created.	\N	2017-08-09 07:10:31.836148	2017-08-09 07:10:31.836148
336	74	Quote requested from Handy man by: 	Martin Valencia	2017-08-09 07:42:51.720087	2017-08-09 07:42:51.720087
337	83	Maintenance request created.	\N	2017-08-09 20:33:12.61192	2017-08-09 20:33:12.61192
338	84	Maintenance request created.	\N	2017-08-09 20:34:12.57391	2017-08-09 20:34:12.57391
339	85	Maintenance request created.	\N	2017-08-09 21:22:26.56634	2017-08-09 21:22:26.56634
340	86	Maintenance request created.	\N	2017-08-15 05:08:21.454865	2017-08-15 05:08:21.454865
341	87	Maintenance request created.	\N	2017-08-16 04:24:12.354228	2017-08-16 04:24:12.354228
342	87	Quote requested from Handy man by: 	Martin Valencia	2017-08-16 05:11:47.928518	2017-08-16 05:11:47.928518
343	87	Quote has been sent by: 	Handy man	2017-08-16 05:12:33.495902	2017-08-16 05:12:33.495902
344	72	Work order sent to Handy man by: 	Martin Valencia	2017-08-16 07:56:56.998157	2017-08-16 07:56:56.998157
345	88	Maintenance request created.	\N	2017-08-17 17:49:43.449984	2017-08-17 17:49:43.449984
346	89	Maintenance request created.	\N	2017-08-18 06:10:38.816926	2017-08-18 06:10:38.816926
347	89	Quote requested from Handy man by: 	Martin Valencia	2017-08-21 03:01:13.317605	2017-08-21 03:01:13.317605
348	89	Quote has been sent by: 	Handy man	2017-08-21 03:05:45.736753	2017-08-21 03:05:45.736753
349	89	Quote has been approved by: 	Martin Valencia	2017-08-21 03:06:54.005526	2017-08-21 03:06:54.005526
350	71	Quote requested from Handy man by: 	Martin Valencia	2017-08-21 04:06:07.981068	2017-08-21 04:06:07.981068
351	71	Quote requested from Electric tesla by: 	Martin Valencia	2017-08-21 04:06:25.660005	2017-08-21 04:06:25.660005
352	71	Quote requested from Electro by: 	Martin Valencia	2017-08-21 04:07:07.425718	2017-08-21 04:07:07.425718
353	71	Quote has been sent by: 	Handy man	2017-08-21 06:08:21.965207	2017-08-21 06:08:21.965207
354	71	Quote has been sent by: 	Elon	2017-08-21 07:05:57.576053	2017-08-21 07:05:57.576053
355	71	Quote has been sent by: 	Electro	2017-08-21 07:09:59.924078	2017-08-21 07:09:59.924078
356	71	Quote has been approved by: 	Martin Valencia	2017-08-21 07:11:45.575976	2017-08-21 07:11:45.575976
357	71	Quote has been sent by: 	Handy man	2017-08-21 08:20:11.341778	2017-08-21 08:20:11.341778
358	88	Quote requested from Handy man by: 	Martin Valencia	2017-08-21 08:57:41.004811	2017-08-21 08:57:41.004811
359	88	Quote has been sent by: 	Handy man	2017-08-21 19:13:17.06182	2017-08-21 19:13:17.06182
360	90	Maintenance request created.	\N	2017-08-22 00:55:12.278192	2017-08-22 00:55:12.278192
361	91	Maintenance request created.	\N	2017-08-22 02:29:30.799118	2017-08-22 02:29:30.799118
362	91	Quote requested from Handy man by: 	Martin Valencia	2017-08-22 02:37:35.600063	2017-08-22 02:37:35.600063
363	91	Quote has been sent by: 	Handy man	2017-08-22 02:39:05.028736	2017-08-22 02:39:05.028736
364	92	Maintenance request created.	\N	2017-08-22 22:38:42.623365	2017-08-22 22:38:42.623365
365	93	Maintenance request created.	\N	2017-08-23 02:36:22.759529	2017-08-23 02:36:22.759529
366	65	Quote has been sent by: 	Handy man	2017-08-23 02:38:28.537763	2017-08-23 02:38:28.537763
367	66	Invoice marked as paid.	\N	2017-08-23 07:10:26.01744	2017-08-23 07:10:26.01744
368	66	Invoice marked as paid.	\N	2017-08-23 07:12:55.543354	2017-08-23 07:12:55.543354
369	66	Invoice marked as paid.	\N	2017-08-24 02:05:42.321328	2017-08-24 02:05:42.321328
370	66	Invoice marked as paid.	\N	2017-08-24 02:32:03.665711	2017-08-24 02:32:03.665711
371	93	Quote requested from Handy man by: 	Martin Valencia	2017-08-24 05:34:21.607755	2017-08-24 05:34:21.607755
372	93	Quote requested from Pipes to go  by: 	Martin Valencia	2017-08-24 05:37:43.410404	2017-08-24 05:37:43.410404
373	93	Work order sent to Electro by: 	Martin Valencia	2017-08-24 05:39:43.734113	2017-08-24 05:39:43.734113
374	93	Quote requested from Bio inc by: 	Martin Valencia	2017-08-24 05:40:24.602147	2017-08-24 05:40:24.602147
375	93	Work order cancelled.	\N	2017-08-24 05:41:12.582211	2017-08-24 05:41:12.582211
376	93	Maintenance request has been reassigned.	\N	2017-08-25 01:08:29.83662	2017-08-25 01:08:29.83662
377	92	Maintenance request has been reassigned.	\N	2017-08-25 01:13:41.186125	2017-08-25 01:13:41.186125
378	66	Invoice marked as paid.	\N	2017-08-25 03:52:31.611026	2017-08-25 03:52:31.611026
\.


--
-- Name: logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('logs_id_seq', 378, true);


--
-- Data for Name: main_users; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY main_users (id, main_user_type, created_at, updated_at, god_id) FROM stdin;
1	Agent	2017-06-28 04:22:25.438986	2017-06-28 04:22:25.438986	1
2	Tenant	2017-06-28 04:22:25.448131	2017-06-28 04:22:25.448131	1
3	Landlord	2017-06-28 04:22:25.455967	2017-06-28 04:22:25.455967	1
\.


--
-- Name: main_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('main_users_id_seq', 3, true);


--
-- Data for Name: maintenance_request_images; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY maintenance_request_images (id, images, maintenance_request_id, created_at, updated_at, image_data) FROM stdin;
\.


--
-- Name: maintenance_request_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('maintenance_request_images_id_seq', 1, false);


--
-- Data for Name: maintenance_requests; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY maintenance_requests (id, name, email, mobile, access_contact, maintenance_heading, maintenance_description, image, availability, created_at, updated_at, agent_id, tenant_id, person_in_charge, real_estate_office, agent_name, agent_email, agent_mobile, service_type, property_id, agency_id, agency_admin_id, trady_id, availability_and_access, work_order_number) FROM stdin;
2	rita	rita@email.com	12634587612	\N	\N	There is a leak again	\N	\N	2017-06-28 05:27:11.096771	2017-06-28 05:27:11.096771	\N	\N	\N	\N	\N	\N	\N	Plumber	2	\N	1	\N	\N	\N
3	rita	rita@email.com	12376412874	\N	testing 243245	The wires in my house dont work OMG TEST	\N	\N	2017-06-28 05:51:57.348071	2017-06-28 05:51:57.348071	\N	\N	\N	\N	\N	\N	\N	Electrician	3	\N	1	\N	\N	\N
4	rita 	rita@email.com	18274621847	\N	\N	This is a test of the PW email 	\N	\N	2017-06-28 05:58:59.758476	2017-06-28 05:58:59.758476	\N	\N	\N	\N	\N	\N	\N	Electrician	4	\N	1	\N	\N	\N
5	rita	rita@email.com	12873461823	\N	\N	This is a test of the emails that are sent from the start 	\N	\N	2017-06-28 07:43:42.8457	2017-06-28 07:43:42.8457	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	1	\N	1	\N	\N	\N
6	rita	rita@email.com	19283746128	\N	\N	testing of the email for tenant	\N	\N	2017-06-28 07:53:31.392264	2017-06-28 07:53:31.392264	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	1	\N	1	\N	\N	\N
7	rita	rita@email.com	28734568023	\N	\N	ASFSADFASDF	\N	\N	2017-06-28 08:49:02.984469	2017-06-28 08:49:02.984469	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	4	\N	1	\N	\N	\N
8	rita	rita@email.com	19324762174	\N	\N	This is a test	\N	\N	2017-06-28 09:19:45.068521	2017-06-28 09:19:45.068521	\N	\N	\N	\N	\N	\N	\N	Plumber	4	\N	1	\N	\N	\N
9	rita	rita@email.com	18723461829	\N	\N	testing 123 	\N	\N	2017-06-28 09:31:39.69626	2017-06-28 10:34:35.54291	\N	\N	\N	\N	\N	\N	\N	Plumber	1	\N	1	1	\N	\N
10	Rita	rita@email.com	43543543654	\N	\N	this is a test of the new emails 	\N	\N	2017-06-28 14:30:03.362425	2017-06-28 14:30:03.362425	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	5	\N	1	\N	\N	\N
11	rita	rita@email.com	21983741092	\N	\N	siuhfsoiufhasi	\N	\N	2017-06-28 14:50:42.637337	2017-06-28 14:50:42.637337	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	6	\N	1	\N	\N	\N
12	rita	rita@email.com	12873462387	\N	\N	aisudhfsoiufdh	\N	\N	2017-06-28 14:52:47.85862	2017-06-28 14:52:47.85862	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Electrician	6	\N	1	\N	\N	\N
13	rita	rita@email.com	12783461982	\N	\N	aifhjaosidfuhasodifu	\N	\N	2017-06-28 14:59:05.206133	2017-06-28 14:59:05.206133	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	6	\N	1	\N	\N	\N
14	rita	rita@email.com	18274361827	\N	\N	asidfhafkjh	\N	\N	2017-06-28 15:01:04.443767	2017-06-28 15:01:04.443767	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Electrician	7	\N	1	\N	\N	\N
15	rita	rita@email.com	12873461982	\N	\N	sidjfaisufhalsi	\N	\N	2017-06-28 15:08:01.069451	2017-06-28 15:08:01.069451	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	8	\N	1	\N	\N	\N
16	rita	rita@email.com	18273418924	\N	\N	h	\N	\N	2017-06-28 15:11:20.075471	2017-06-28 15:11:20.075471	\N	\N	\N	\N	\N	\N	\N	Plumber	8	\N	\N	\N	\N	\N
17	rita	rita@email.com	12873412897	\N	\N	aksjfdhalsdkfjhalksfdj	\N	\N	2017-06-28 15:13:21.732302	2017-06-28 15:13:21.732302	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	9	\N	1	\N	\N	\N
18	Rita	rita@email.com	12873641827	\N	\N	aisdjhfsaiaufh	\N	\N	2017-06-28 15:17:55.527804	2017-06-28 15:17:55.527804	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	8	\N	1	\N	\N	\N
19	rita	rita@email.com	12348971287	\N	\N	askdjfalskfdjhasfdkjh	\N	\N	2017-06-28 15:43:27.098074	2017-06-28 18:38:47.533208	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	10	\N	1	1	\N	\N
20	rita	rita@email.com	17824361832	\N	\N	alsdkuhflsuhfasdkfu	\N	\N	2017-06-29 04:11:51.359439	2017-06-29 04:11:51.359439	\N	\N	\N	\N	\N	\N	\N	Plumber	11	\N	1	\N	\N	\N
21	rita	rita@email.com	12387162487	\N	\N	jfklsajfhaslkfjhalkj	\N	\N	2017-06-29 04:13:45.733247	2017-06-29 04:13:45.733247	\N	\N	\N	\N	\N	\N	\N	Plumber	12	\N	1	\N	\N	\N
22	rita	rita@email.com	18237481972	\N	\N	uasdgoiuSDAUISDGAOSUY	\N	\N	2017-06-29 04:58:19.399968	2017-06-29 04:58:19.399968	\N	\N	\N	\N	\N	\N	\N	Plumber	12	\N	1	\N	\N	\N
24	rita	rita@email.com	23856238975	\N	\N	skdjgklsjdfghkdfgjh	\N	\N	2017-06-29 05:07:05.740832	2017-06-29 05:46:25.397092	\N	\N	\N	\N	\N	\N	\N	Plumber	9	\N	1	1	\N	\N
23	rita	rita@email.com	38275238745	\N	\N	uiguyg	\N	\N	2017-06-29 05:01:38.733384	2017-06-29 06:06:01.721801	\N	\N	\N	\N	\N	\N	\N	Plumber	13	\N	1	1	\N	\N
41	rita	rita@email.com	82374659823	\N	\N	siuefhgisughi	\N	\N	2017-07-12 10:28:38.179884	2017-07-12 10:28:38.179884	\N	\N	\N	\N	\N	\N	\N	Plumber	4	\N	1	\N	isuhdfliuhsdfgl	W227bc24859
26	rita	rita@email.com	18273461982	\N	\N	askdfjhaslfjkhask	\N	\N	2017-06-30 12:41:02.296065	2017-06-30 12:41:02.296065	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	4	\N	1	\N	iugdiufglskdflsdf	\N
27	ronaldo	bbxapp@gmail.com	18276439816	\N	\N	this is a test of the email confirmaton	\N	\N	2017-06-30 12:51:41.796646	2017-06-30 12:51:41.796646	\N	3	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	15	\N	1	\N	123 	\N
42	rita	rita@email.com	22176349872	\N	\N	kjfskdufhlkdshkjsdfh	\N	\N	2017-07-12 10:31:15.598676	2017-07-12 10:31:15.598676	\N	\N	\N	\N	\N	\N	\N	Plumber	18	\N	1	\N	sdlkjghdslkfgjdfg	Wa776d520b7
43	rita	rita@email.com	12387465982	\N	\N	sjdhflasjhdflksjhf	\N	\N	2017-07-12 13:46:17.583543	2017-07-12 13:46:17.583543	\N	\N	\N	\N	\N	\N	\N	Plumber	4	\N	1	\N	oiulhsiudfghldsgf	W46014595b1
48	rita	rita@email.com	23764598234	\N	\N	jhdgfkjshdfgdshgl	\N	\N	2017-07-14 07:31:50.882073	2017-07-14 07:31:50.882073	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	3	\N	1	\N	kjshdflkjghsdlkgfjsdgf	W06e5600e53
31	rita	rita@email.com	12736948127	\N	\N	This is a test if the work order number	\N	\N	2017-07-11 08:45:53.083732	2017-07-11 08:45:53.083732	\N	\N	\N	\N	\N	\N	\N	Plumber	4	\N	1	\N	iusdhfoiauhfsoiasuhfd	\N
32	Rita	rita@email.com	12734698712	\N	\N	This is a test of the text messaging sytem	\N	\N	2017-07-12 08:43:37.113115	2017-07-12 08:43:37.113115	\N	\N	\N	\N	\N	\N	\N	Plumber	4	\N	1	\N	Thajsdfoi this ias oia selsjf;ldaksfsdf	Web04469559
33	rita	rita@email.com	12873469827	\N	\N	sdfgsdfg	\N	\N	2017-07-12 08:46:41.968362	2017-07-12 08:46:41.968362	\N	\N	\N	\N	\N	\N	\N	Plumber	3	\N	1	\N	sdgfsdfgdsfg	W1f771b4dbb
34	rita	rita@email.com	12734619284	\N	\N	slkdjhfaklsjdhfaksf	\N	\N	2017-07-12 08:57:11.837388	2017-07-12 08:57:11.837388	\N	\N	\N	\N	\N	\N	\N	Plumber	3	\N	1	\N	lkjdfhglskdjfhglksdjhfg	Waa07aecd95
35	rita	rita@email.com	12381246387	\N	\N	sdfgsdfgdsfg	\N	\N	2017-07-12 09:02:24.721103	2017-07-12 09:02:24.721103	\N	\N	\N	\N	\N	\N	\N	Plumber	3	\N	1	\N	sdfgdsfgdfgdfg	W3af9e02a70
36	rita	rita@email.com	12834761982	\N	\N	uyb	\N	\N	2017-07-12 09:43:59.747958	2017-07-12 09:43:59.747958	\N	\N	\N	\N	\N	\N	\N	Plumber	6	\N	1	\N	yuibiuy	W7bae3115dd
25	rita	rita@email.com	34534532534	\N	\N	dfgghfdgfhgfgdh	\N	\N	2017-06-29 08:35:47.925644	2017-07-03 17:06:57.968432	\N	\N	\N	\N	\N	\N	\N	Plumber	14	\N	1	1	fdghfghfghfghdfgh	\N
28	rita	rita@email.com	54375354765	\N	\N	fuytytdytfyut	\N	\N	2017-07-04 17:00:58.806061	2017-07-04 17:00:58.806061	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	16	\N	1	\N	uyuyguygiuyg	\N
1	rita	rita@email.com	12345639845	\N	\N	There is a leak in my house	\N	\N	2017-06-28 05:24:33.27844	2017-07-06 06:44:49.264631	\N	1	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	1	\N	1	1	\N	\N
29	rita	rita@email.com	28765832974	\N	\N	testing 	\N	\N	2017-07-06 10:24:17.211583	2017-07-07 07:38:33.186143	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	3	\N	1	1	testing 	\N
37	rita	rita@email.com	23847582376	\N	\N	iuhoiuhoiu	\N	\N	2017-07-12 09:48:16.531913	2017-07-12 09:48:16.531913	\N	\N	\N	\N	\N	\N	\N	Plumber	4	\N	1	\N	oiuhoihohu	W58628c5e10
38	rita	rita@email.com	82374509283	\N	\N	luihkuybou	\N	\N	2017-07-12 09:51:09.974217	2017-07-12 09:51:09.974217	\N	\N	\N	\N	\N	\N	\N	Plumber	3	\N	1	\N	bdfghfdgh	W024bb0c4ee
39	rita	rita@email.com	23758972365	\N	\N	skjdfhglksdugh	\N	\N	2017-07-12 09:56:59.517215	2017-07-12 09:56:59.517215	\N	\N	\N	\N	\N	\N	\N	Plumber	16	\N	1	\N	siohfglidushfhudsgliudfg	W856a1ce713
40	rita	rita@email.com	23845823756	\N	\N	uibsdoifgubsodgfiu	\N	\N	2017-07-12 10:00:33.943743	2017-07-12 10:00:33.943743	\N	\N	\N	\N	\N	\N	\N	Plumber	3	\N	1	\N	iuhsdofiguhsdoigf	Wd18a39a6e2
44	rita	rita@email.com	17236498172	\N	\N	skdjfhlskjdfhlksfjh	\N	\N	2017-07-12 13:49:33.135355	2017-07-12 13:49:33.135355	\N	\N	\N	\N	\N	\N	\N	Plumber	4	\N	1	\N	sdfjghlsdkjfghlsdkjg	W2b4b0136b4
45	rita	rita@email.com	29835749283	\N	\N	skjdflkdsjhglkjh	\N	\N	2017-07-12 14:21:24.630084	2017-07-12 14:21:24.630084	\N	\N	\N	\N	\N	\N	\N	Plumber	19	\N	1	\N	djkfhglksdjhglkjdgf	W93ae84fb49
46	rita	rita@email.com	23987652389	\N	\N	skdjhflskdjfhlkjh	\N	\N	2017-07-12 14:31:09.678534	2017-07-12 14:31:09.678534	\N	\N	\N	\N	\N	\N	\N	Plumber	16	\N	1	\N	sdlkjfghlkjsdfhlkgdfg	W5b2cfed608
47	rita	rita@email.com	23874528374	\N	\N	iksdhfksjdhfkjsfhkjdhsg	\N	\N	2017-07-12 14:37:08.799453	2017-07-12 14:37:08.799453	\N	\N	\N	\N	\N	\N	\N	Plumber	16	\N	1	\N	skdfjghskdjfghlkdgf	W5afb7d83f7
30	Rita	rita@email.com	23745872364	\N	\N	This is a test of the MR app from start to finish 	\N	\N	2017-07-10 09:25:53.928095	2017-07-13 04:14:35.834635	\N	\N	\N	\N	\N	\N	\N	Plumber	17	\N	1	1	I am available from 9 am to 5pm every day. The entrance can be accessed from the back of the building	\N
49	rita	rita@email.com	89437523098	\N	\N	dksjfglskdhglskdh	\N	\N	2017-07-14 07:38:21.663565	2017-07-14 07:38:21.663565	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	3	\N	1	\N	sdhfglksdjhglkjdfg	W2433e62484
50	rita	rita@email.com	28734659823	\N	\N	kjhlkjhlk	\N	\N	2017-07-14 07:40:44.248411	2017-07-14 07:40:44.248411	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	20	\N	1	\N	jsdfgdsfg	Wbc9792472c
51	rita	rita@email.com	28374658237	\N	\N	kjdhgflskdjgfk	\N	\N	2017-07-14 07:44:05.515251	2017-07-14 07:44:05.515251	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	21	\N	1	\N	sldjkfghlskjdfhgl	Wdabef832b5
53	rita	rita@email.com	28437658923	\N	\N	hdslkjfhglkjsdhfglkjsdhgflkj	\N	\N	2017-07-14 08:07:44.79865	2017-07-14 08:07:44.79865	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	16	\N	1	\N	slkjdhfgiushdlfighliu	Waf4e65af76
54	rita	rita@email.com	23845682375	\N	\N	jhkjhgkjhgjkhgkj	\N	\N	2017-07-14 08:09:56.942016	2017-07-14 08:09:56.942016	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	3	\N	1	\N	dfdgsdgdfgsdggdf	W2ec6461b94
52	rita	rita@email.com	23847569832	\N	\N	ksjdhlkdsjfghlksdjfgh	\N	\N	2017-07-14 08:03:57.797446	2017-07-14 08:03:57.797446	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	22	\N	1	\N	lksjfdhglksjdhfglk	W8af2481b38
55	sdfgsdg	rita@email.com	34958723958	\N	\N	lkjhlkjhlkjh	\N	\N	2017-07-14 08:11:21.565942	2017-07-14 08:11:21.565942	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	3	\N	1	\N	lkjhlkjhlkjh	Wec82b71b9b
56	rita	rita@email.com	23847523875	\N	\N	dskgjhdskgljdshg	\N	\N	2017-07-14 08:12:48.16774	2017-07-14 08:12:48.16774	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	23	\N	1	\N	lkjdhfglskjdhglkdjg	Wc887b31b27
57	rita	rita@email.com	23498572039	\N	\N	kjhgkjhfgiughlibvhdifunb	\N	\N	2017-07-14 10:31:30.470461	2017-07-14 10:31:30.470461	\N	\N	\N	\N	\N	\N	\N	Plumber	3	\N	1	\N	idufhboidufgodiuhgldf	W46e0827982
58	phina	joshephina@email.com	91837409287	\N	\N	alksdjhflkasjhflskadjfhl	\N	\N	2017-07-16 12:11:45.26926	2017-07-16 12:11:45.26926	\N	4	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	24	\N	1	\N	asdklfja;sldkfjl;skf	\N
59	rita	rita@email.com	13987091284	\N	\N	asldfoisahudfpiuhawefiuh	\N	\N	2017-07-16 14:15:15.464906	2017-07-16 14:15:15.464906	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	4	\N	1	\N	usdhfgliudhsfgliuhdfig	\N
60	martin	rita@email.com	12093487091	\N	\N	jksdhflkjsdhvlkjh	\N	\N	2017-07-16 15:38:27.872053	2017-07-16 15:38:27.872053	\N	\N	\N	\N	\N	\N	\N	Plumber	3	\N	1	\N	kdfjshglksjdgh	\N
61	rita	rita@email.com	98174098234	\N	\N	23849570dskjvnlkndsj	\N	\N	2017-07-16 15:39:32.103576	2017-07-16 15:39:32.103576	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	4	\N	1	\N	skdjnlkjsndfvjkndslvf	\N
78	rita	rita@email.com	87562938475	\N	\N	This is a test of the new valdiation and also for the landlord issue	\N	\N	2017-08-07 08:20:35.366154	2017-08-07 08:20:35.366154	\N	\N	\N	\N	\N	\N	\N	Plumber	29	\N	1	\N	im available on fridays 	Wa0fe7effda
63	theo	theocat@email.com	23405983450	\N	\N	this is a test of the MR 	\N	\N	2017-07-21 02:45:05.277482	2017-07-21 02:45:05.277482	\N	6	\N	Olga Company	Olga	olga@email.com	23847509872	Plumber	3	\N	\N	\N	Thsdjfposiajdfpoisjpafosdf	\N
62	rita	rita@email.com	21930470921	\N	\N	There is a leak in the roof. Can you please send a plumber to fix up the leak. 	\N	\N	2017-07-19 16:54:00.689163	2017-07-19 17:07:15.339655	\N	\N	\N	\N	\N	\N	\N	Electrician	25	\N	1	1	Im available Monday to Friday after 5 pm 	\N
64	rita	rita@email.com	20349857092	\N	\N	Have a leak	\N	\N	2017-07-25 16:05:12.204936	2017-07-25 16:05:12.204936	\N	\N	\N	\N	\N	\N	\N	Plumber	4	\N	1	\N	fridays	\N
65	rita	rita@email.com	29857291834	\N	\N	I need some help there is a leak inside of the roof	\N	\N	2017-07-25 20:15:48.671474	2017-07-25 23:58:07.747217	\N	\N	\N	\N	\N	\N	\N	Plumber	3	\N	1	1	Im available on fridays after 5 pm 	\N
66	rita	rita@emial.com	92837094823	\N	\N	This is a test of the landlord change and add system	\N	\N	2017-07-26 00:34:22.213457	2017-07-26 00:37:11.650232	\N	7	\N	\N	\N	\N	\N	Plumber	26	\N	1	1	testing 123 	\N
67	rita	rita@email.com	20395723094	\N	\N	kjhlekfnsldkjgndfklsjng	\N	\N	2017-07-26 00:49:47.371894	2017-07-26 00:49:47.371894	\N	\N	\N	\N	\N	\N	\N	Plumber	16	\N	1	\N	dslkjfgnldkfsjgnldksjg	\N
68	rita	rita@email.com	28376498732	\N	\N	jhbkjhbljhb	\N	\N	2017-07-26 00:56:32.380156	2017-07-26 00:56:32.380156	\N	\N	\N	\N	\N	\N	\N	Plumber	27	\N	1	\N	hbljhbljhbljbh	W55da0f76ec
69	kanye	west@email.com	23845702938	\N	\N	ksjdflksdjfglksdjfgh	\N	\N	2017-07-26 06:05:19.998811	2017-07-26 06:05:19.998811	\N	8	\N	\N	\N	\N	\N	Electrician	3	\N	1	\N	ds;gfkjsdlfkgj;dslkgfjd;lfg	W45e16bd709
70	rita	rita@email.com	23084917248	\N	\N	testing	\N	\N	2017-07-27 04:27:44.300785	2017-07-27 04:27:44.300785	2	\N	\N	\N	\N	\N	\N	Plumber	28	\N	\N	\N	tesing	Wb82e264bf0
90	rita	rita@email.com	28736458923	\N	\N	This is a test og th email scheduel	\N	\N	2017-08-22 00:55:11.805568	2017-08-22 00:55:11.805568	\N	\N	\N	\N	\N	\N	\N	Plumber	7	\N	1	\N	ksdljfghlskdfjhglkdsfg	W2edb0fc275
73	rita	rita@email.com	29348750938	\N	\N	akjshflkajshflkajshdfkj	\N	\N	2017-07-31 05:29:06.223528	2017-07-31 05:29:06.223528	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	16	\N	1	\N	kjsdhflkjdshgflkjdfhsg	W55d742c500
74	rita	rita@email.com	29084570923	\N	\N	kjdflkjhsdgfkljdfhgk	\N	\N	2017-07-31 05:33:57.334026	2017-07-31 05:33:57.334026	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	3	\N	1	\N	kjdhsfglksdjhgflkjdsfg	W2f557329ae
75	rita	rita@email.com	218376491287436	\N	asdfjoiasjdifojasoidjfo	askjdhfuishifuhilur	\N	\N	2017-07-31 20:59:24.466401	2017-07-31 20:59:24.466401	\N	\N	\N			martin@maintenanceapp.com.au		Plumber	3	\N	1	\N	\N	W1149404c37
76	rita	rita@email.com	19824719204	\N	\N	This is a test of the MR For the new MR from 	\N	\N	2017-08-07 02:42:05.918264	2017-08-07 02:42:05.918264	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	3	\N	1	\N	Please come at 5 pm 	Wfce6020e49
77	rita	rita@email.com	12874128764	\N	\N	This is a test of the uploading of the Image with the new MR form	\N	\N	2017-08-07 02:58:26.266592	2017-08-07 02:58:26.266592	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	3	\N	1	\N	come at 5 pm 	W0a9cbe3984
79	rita	rita@email.com	12874369182	\N	\N	This is a test of the emails 	\N	\N	2017-08-08 05:00:19.47373	2017-08-08 05:00:19.47373	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Electrician	30	\N	1	\N	please come from 5 pm and after	W9ace28de98
80	rita	rita@email.com	12234758374	\N	\N	isudfghoisdufghoisdguh	\N	\N	2017-08-08 05:10:08.791799	2017-08-08 05:10:08.791799	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	31	\N	1	\N	hsdgfiouhosiudhfgi	We5fac82bf0
81	rita	rita@email.com	12364872634	\N	\N	This is a test of the entire system	\N	\N	2017-08-08 23:31:50.175994	2017-08-09 00:07:58.899348	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	32	\N	1	2	this is a test of the entire system again 	Wfe636b2236
82	rita	rita@email.com	23948750239	\N	\N	test of the filter	\N	\N	2017-08-09 07:10:31.680363	2017-08-09 07:10:31.680363	\N	\N	\N	\N	\N	\N	\N	Plumber	33	\N	1	\N	lisuhgdlidhfgiluhsdgl	W531976e3ea
83	rita	rita@email.com	23874652895	\N	\N	testing email link	\N	\N	2017-08-09 20:33:12.423937	2017-08-09 20:33:12.423937	2	\N	\N	\N	\N	\N	\N	Plumber	3	\N	\N	\N	ahflksajhflk	Wd314d0f38b
84	rita	rita@email.com	98234750983	\N	\N	ajsfhkljasdhfkj	\N	\N	2017-08-09 20:34:12.468491	2017-08-09 20:34:12.468491	2	\N	\N	\N	\N	\N	\N	Plumber	5	\N	\N	\N	skdjhgflkdjfhg	W9afeba7631
85	rita	rita@email.com	28374569283	\N	\N	alkfjhaskdfjh	\N	\N	2017-08-09 21:22:26.470186	2017-08-09 21:22:26.470186	2	\N	\N	\N	\N	\N	\N	Plumber	3	\N	\N	\N	kjsdhflgksjdhdfgjkl	W5253349fae
86	rita	rita@email.com	12345639845	\N	\N	ysyresydfg	\N	\N	2017-08-15 05:08:18.709974	2017-08-15 05:08:18.709974	\N	\N	\N	\N	\N	\N	\N	Plumber	16	\N	\N	\N	jhbkjhbkjhbh	We0c302e54b
87	rita	rita@email.com	23876238476	\N	\N	this is a test of the new emial ID 	\N	\N	2017-08-16 04:24:12.010131	2017-08-16 04:24:12.010131	\N	\N	\N	\N	\N	\N	\N	Electrician	34	\N	1	\N	firday 	W0db34e3309
72	rita	rita@email.com	29387450239	\N	\N	this is a test of the images	\N	\N	2017-07-31 05:20:01.519072	2017-08-16 07:56:57.025743	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	3	\N	1	1	ajkfhadskjfhskjdf	We712fb0eb1
88	rita	rita@email.com	42873568732	\N	\N	kjhljgkjhgkj	\N	\N	2017-08-17 17:49:42.936706	2017-08-17 17:49:42.936706	\N	\N	\N	\N	\N	\N	\N	Plumber	4	\N	1	\N	gjkhgkjhgkj	Wd9264f7e2f
89	rita	rita@email.com	23095872350	\N	\N	fdjhglskdjfgh	\N	\N	2017-08-18 06:10:38.407695	2017-08-21 03:06:53.578007	\N	\N	\N	\N	\N	\N	\N	Plumber	12	\N	1	1	lskdfjhdfghjlsiduhfghilu	W9bf0d9afa5
71	rita	rita@email.com	12349876123	\N	\N	skjhfksjdhggkjdhfgf	\N	\N	2017-07-28 07:45:41.470633	2017-08-21 07:11:45.058311	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	1	\N	1	1	sdjhksjhdfkasjhlfk	W0eadb0d28d
91	rita	rita@email.com	34298572903	\N	\N	jdflgksdjfhglskdjh	\N	\N	2017-08-22 02:29:30.63411	2017-08-22 02:29:30.63411	\N	\N	\N	\N	\N	martin@maintenanceapp.com.au	\N	Plumber	35	\N	1	\N	skjdhfglkjdshglkdf	W669a12e70b
93	rita	rita@email.com	29354780293	\N	\N	slkdjghsdlfkgjh	\N	\N	2017-08-23 02:36:22.484788	2017-08-24 05:41:12.484049	2	\N	\N	\N	\N	\N	\N	Electrician	36	\N	\N	\N	ajsldfkjslkdf	W99869ae3c4
92	rita	rita@email.com	17239487624	\N	\N	this is a test fo theemails	\N	\N	2017-08-22 22:38:42.289728	2017-08-22 22:38:42.289728	2	\N	\N	\N	\N	\N	\N	Plumber	35	\N	\N	\N	djnflksdfjhglkdfg	W5fbefc2d8a
\.


--
-- Name: maintenance_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('maintenance_requests_id_seq', 93, true);


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY messages (id, user_id, created_at, updated_at, body, conversation_id, role) FROM stdin;
1	2	2017-06-28 09:43:15.56083	2017-06-28 09:43:15.605122	this is a test of the comments	1	\N
2	2	2017-06-28 09:43:59.95292	2017-06-28 09:43:59.974383	This is a test of the message system from landlord	2	\N
3	2	2017-06-28 10:06:25.310712	2017-06-28 10:06:25.343726	this is a message for the trady about the quote 	3	\N
40	3	2017-07-25 22:39:05.808513	2017-07-25 22:39:05.835007	jhdkfjdsaf	21	Tenant
6	2	2017-07-03 06:04:24.895558	2017-07-03 06:04:24.927051	testing 123 	5	AgencyAdmin
7	2	2017-07-03 10:40:15.756689	2017-07-03 10:40:15.783657	Testting	6	AgencyAdmin
8	2	2017-07-04 08:13:19.406797	2017-07-04 08:13:19.429159	hello 	7	AgencyAdmin
9	2	2017-07-04 08:15:08.358468	2017-07-04 08:15:08.383152	sdsfdds	7	AgencyAdmin
10	6	2017-07-04 13:21:12.280999	2017-07-04 13:21:12.303826	testing message emails 	8	Landlord
11	6	2017-07-04 13:21:43.481247	2017-07-04 13:21:43.500197	test 2 for email message	8	Landlord
12	2	2017-07-04 13:27:03.863781	2017-07-04 13:27:03.890803	this is a test fo rthe email to landlord	8	AgencyAdmin
13	2	2017-07-04 15:07:21.469546	2017-07-04 15:07:21.491724	this is a test of the email for tenants	9	AgencyAdmin
14	2	2017-07-04 15:15:17.967927	2017-07-04 15:15:17.985566	this is the next test	9	AgencyAdmin
15	2	2017-07-04 15:15:49.130418	2017-07-04 15:15:49.150851	uhiuhou	9	AgencyAdmin
16	2	2017-07-04 16:00:58.871488	2017-07-04 16:00:58.892212	testing trady message email	10	AgencyAdmin
17	2	2017-07-04 16:02:25.700019	2017-07-04 16:02:25.723205	now test it 	10	AgencyAdmin
18	4	2017-07-04 16:03:10.555929	2017-07-04 16:03:10.575128	testing agent email	10	Trady
19	3	2017-07-05 06:39:35.044723	2017-07-05 06:39:35.081949	jhgkjhgkj	11	Tenant
20	2	2017-07-05 06:40:24.769527	2017-07-05 06:40:24.792022	sdgdsg	12	AgencyAdmin
21	2	2017-07-05 06:40:35.017581	2017-07-05 06:40:35.036549	dsgsdgfsdgf	11	AgencyAdmin
22	4	2017-07-05 07:16:05.14358	2017-07-05 07:16:05.16716	sdgfdsg	13	Trady
23	4	2017-07-05 07:17:21.34879	2017-07-05 07:17:21.367903	hjgfjhg	13	Trady
24	2	2017-07-05 07:18:46.99243	2017-07-05 07:18:47.012402	testing trady email 	13	AgencyAdmin
25	4	2017-07-05 07:22:18.450427	2017-07-05 07:22:18.475455	kjhgkjh	13	Trady
26	2	2017-07-05 11:07:40.84619	2017-07-05 11:07:40.867103	etyeryrey	11	AgencyAdmin
27	2	2017-07-10 08:36:48.211346	2017-07-10 08:36:48.234117	testing 	14	AgencyAdmin
28	2	2017-07-10 09:33:28.748948	2017-07-10 09:33:28.786428	dfsgdsgf	15	AgencyAdmin
29	2	2017-07-13 04:37:27.689912	2017-07-13 04:37:27.724471	dfghdfghdfg	16	AgencyAdmin
30	2	2017-07-13 04:37:44.752683	2017-07-13 04:37:44.778179	erererty	15	AgencyAdmin
31	3	2017-07-13 04:38:51.014179	2017-07-13 04:38:51.062359	fgdfghfgh	17	Tenant
32	3	2017-07-13 04:39:12.127314	2017-07-13 04:39:12.153426	sdfgdgf	17	Tenant
33	3	2017-07-13 04:40:35.762497	2017-07-13 04:40:35.787908	sdfgsdfg	17	Tenant
34	2	2017-07-14 19:05:49.655486	2017-07-14 19:05:49.680461	wergwerg	18	AgencyAdmin
35	3	2017-07-14 19:06:05.983078	2017-07-14 19:06:06.002567	fghfghfgh	18	Tenant
36	2	2017-07-19 17:02:53.66653	2017-07-19 17:02:53.695453	testing 	19	AgencyAdmin
37	6	2017-07-25 20:50:18.54167	2017-07-25 20:50:18.564185	this is a test of the message system for landlord 	20	Landlord
38	2	2017-07-25 20:52:42.420932	2017-07-25 20:52:42.439771	this is a message for the landlord 	20	AgencyAdmin
39	2	2017-07-25 20:56:09.919818	2017-07-25 20:56:09.942282	this is a test of th enew emails	20	AgencyAdmin
41	2	2017-07-25 23:12:02.57979	2017-07-25 23:12:02.603385	this is a message for the trady 	22	AgencyAdmin
42	4	2017-07-25 23:12:55.972745	2017-07-25 23:12:55.999762	sdhfdfg	22	Trady
43	3	2017-07-26 00:32:31.467139	2017-07-26 00:32:31.485659	hgfjh	21	Tenant
44	6	2017-08-01 23:38:32.910833	2017-08-01 23:38:32.933821	hgjhghjkgjkh	23	Landlord
45	6	2017-08-02 00:13:53.676504	2017-08-02 00:13:53.696311	jhgjhgjkjhgk	23	Landlord
46	6	2017-08-02 00:16:05.734444	2017-08-02 00:16:05.754869	sdfsfasdfasf	23	Landlord
47	6	2017-08-02 00:17:42.574793	2017-08-02 00:17:42.601121	sasdfasfdsdf	23	Landlord
48	6	2017-08-02 00:19:41.474157	2017-08-02 00:19:41.49322	gkjhgkjhgkhj	23	Landlord
49	6	2017-08-02 00:23:16.313646	2017-08-02 00:23:16.338686	ksdhalksdjh	23	Landlord
50	2	2017-08-08 05:11:52.717632	2017-08-08 05:11:52.740681	jkhkljnljk	24	AgencyAdmin
51	3	2017-08-08 05:13:14.822019	2017-08-08 05:13:14.840562	askfjhskdjfh	24	Tenant
52	3	2017-08-08 05:17:52.984447	2017-08-08 05:17:53.003018	jhgkjhgkjh	24	Tenant
53	2	2017-08-08 05:25:29.714367	2017-08-08 05:25:29.733348	asdkfjhaslkdf	24	AgencyAdmin
54	3	2017-08-08 05:25:53.280632	2017-08-08 05:25:53.299614	sasfdasdfsd	24	Tenant
55	3	2017-08-08 05:26:14.733253	2017-08-08 05:26:14.752539	adsfsdf	24	Tenant
56	2	2017-08-08 05:27:14.286868	2017-08-08 05:27:14.306465	dsasdfsdf	24	AgencyAdmin
57	3	2017-08-08 05:27:53.607847	2017-08-08 05:27:53.627329	asdfasdf	24	Tenant
58	6	2017-08-08 05:36:19.598906	2017-08-08 05:36:19.619489	asdfsdf	25	Landlord
59	2	2017-08-08 06:27:24.406743	2017-08-08 06:27:24.43451	gkjhgkjhgkj	24	AgencyAdmin
60	2	2017-08-08 06:28:59.75785	2017-08-08 06:28:59.791593	jnm,mnm	24	AgencyAdmin
61	3	2017-08-08 06:29:45.702448	2017-08-08 06:29:45.726631	lkjl;kj;lk	24	Tenant
62	4	2017-08-08 06:58:03.282818	2017-08-08 06:58:03.314106	jhgkjg	26	Trady
63	2	2017-08-08 07:09:06.342258	2017-08-08 07:09:06.361761	asfkjhslkdf	26	AgencyAdmin
64	6	2017-08-08 07:42:21.519693	2017-08-08 07:42:21.545447	sfsdfdsf	25	Landlord
65	3	2017-08-08 23:44:36.441145	2017-08-08 23:44:36.461311	sdgsdgdfg	27	Tenant
66	3	2017-08-08 23:44:46.587256	2017-08-08 23:44:46.607446	sdgsdfg	27	Tenant
67	2	2017-08-08 23:45:04.711111	2017-08-08 23:45:04.73007	sdgsdgsdg	27	AgencyAdmin
68	19	2017-08-08 23:47:04.759076	2017-08-08 23:47:04.781541	dgfjdfgh	28	Landlord
69	2	2017-08-08 23:55:57.409249	2017-08-08 23:55:57.429883	jhgkjhg	29	AgencyAdmin
70	5	2017-08-08 23:56:47.214145	2017-08-08 23:56:47.23308	hgfjyfj	29	Trady
71	2	2017-08-09 00:03:30.249506	2017-08-09 00:03:30.268851	xcvbxcvb	29	AgencyAdmin
72	5	2017-08-09 00:04:20.907623	2017-08-09 00:04:20.927715	asfasfdads	29	Trady
73	2	2017-08-09 00:07:51.974628	2017-08-09 00:07:51.995209	sdfgsdfg	30	AgencyAdmin
74	2	2017-08-09 00:24:12.581641	2017-08-09 00:24:12.602342	dfdsfgsdfg	29	AgencyAdmin
\.


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('messages_id_seq', 74, true);


--
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY properties (id, agency_admin_id, landlord_id, property_address, agency_id) FROM stdin;
2	1	\N	456 Swanston Street, Carlton, Victoria, Australia	1
1	1	1	123 Princes Highway, Port Fairy, Victoria, Australia	1
5	1	\N	3456 Pacific Highway, Springwood, Queensland, Australia	1
6	1	\N	34 Princes Highway, Port Fairy, Victoria, Australia	1
7	1	\N	765 Princes Highway, Tempe, New South Wales, Australia	1
8	1	\N	12 Princes Highway, Narooma, New South Wales, Australia	1
10	1	1	346 Princes Highway, Corrimal, New South Wales, Australia	1
11	1	\N	2434 Gold Coast Highway, Mermaid Beach, Queensland, Australia	1
9	1	1	56 Princes Highway, Eden, New South Wales, Australia	1
13	1	1	56 Princes Highway, Eden, New South Wales, Australia\r\n	1
15	1	\N	34 Princes Highway, Port Fairy, Victoria, Australia\r\n	1
14	1	1	45 Princes Highway, Lucknow, Victoria, Australia	1
16	1	1	567 George Street, Sydney, New South Wales, Australia	1
12	1	1	234 Princes Highway, Port Fairy, Victoria, Australia	1
17	1	1	456 Oxford Street, Paddington, New South Wales, Australia	1
18	1	\N	7465 Goulburn Valley Highway, Kialla West, Victoria, Australia\r\n	1
19	1	\N	567 George Street, Sydney, New South Wales, Australia\r\n	1
20	1	\N	2345 Albany Highway, Gosnells, Western Australia, Australia	1
21	1	\N	34511 Princes Highway, Suttontown, South Australia, Australia	1
22	1	\N	1234 hgfdhg	1
23	1	\N	35 Princes Highway, Eden, New South Wales, Australia	1
24	1	\N	1235 Princes Highway, Heathmere, Victoria, Australia\r\n	1
4	1	2	345 Princes Highway, Woonona, New South Wales, Australia	1
25	1	1	1235 Princes Highway, Heathmere, Victoria, Australia	1
3	1	1	456 Princes Highway, Rockdale, New South Wales, Australia	1
26	1	\N	4893 James Craig Road, Rozelle, New South Wales, Australia	1
27	1	\N	599 Princes Highway, Heathmere, Victoria, Australia	1
28	1	\N	234 Collins Street, Melbourne, Victoria, Australia	1
29	1	\N	987 Logan Road, Holland Park West, Queensland, Australia	1
30	1	\N	567 Chapel Street, South Yarra, Victoria, Australia	1
31	1	1	987 Pacific Highway, Pymble, New South Wales, Australia	1
32	1	3	1234 Princes Highway, Heathmere, Victoria, Australia	1
33	1	\N	757 George Street, Haymarket, New South Wales, Australia	1
34	1	\N	36 Princes Highway, Eden, New South Wales, Australia	1
35	1	\N	69 Cook Road, Centennial Park, New South Wales, Australia	1
36	1	\N	69 George Street, The Rocks, New South Wales, Australia	1
\.


--
-- Name: properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('properties_id_seq', 36, true);


--
-- Data for Name: queries; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY queries (id, maintenance_request_id, user_role, tradie, address) FROM stdin;
1	\N	Tenant	Plumber	123 Princes Highway, Port Fairy, Victoria, Australia
2	\N	Agent	Plumber	456 Swanston Street, Carlton, Victoria, Australia
3	\N	Agent	Electrician	456 Princes Highway, Rockdale, New South Wales, Australia
4	\N	Agent	Electrician	345 Princes Highway, Woonona, New South Wales, Australia
5	\N	Tenant	Plumber	123 Princes Highway, Port Fairy, Victoria, Australia
6	\N	Tenant	Plumber	123 Princes Highway, Port Fairy, Victoria, Australia
7	\N	Agent	Plumber	56 Princes Highway, Eden, New South Wales, Australia
8	\N	Tenant	Plumber	345 Princes Highway, Woonona, New South Wales, Australia
9	\N	Tenant	Plumber	345 Princes Highway, Woonona, New South Wales, Australia
10	\N	Agent	Plumber	345 Princes Highway, Woonona, New South Wales, Australia
11	\N	Agent	Plumber	123 Princes Highway, Port Fairy, Victoria, Australia
12	\N	Agent	Plumber	3456 Pacific Highway, Springwood, Queensland, Australia
13	\N	Tenant	Plumber	3456 Pacific Highway, Springwood, Queensland, Australia
14	\N	Tenant	Plumber	34 Princes Highway, Port Fairy, Victoria, Australia
15	\N	Tenant	Electrician	34 Princes Highway, Port Fairy, Victoria, Australia
16	\N	Tenant	Plumber	34 Princes Highway, Port Fairy, Victoria, Australia
17	\N	Tenant	Electrician	765 Princes Highway, Tempe, New South Wales, Australia
18	\N	Tenant	Plumber	12 Princes Highway, Narooma, New South Wales, Australia
19	\N	Tenant	Plumber	12 Princes Highway, Narooma, New South Wales, Australia
20	\N	Tenant	Plumber	56 Princes Highway, Eden, New South Wales, Australia
21	\N	Tenant	Electrician	23 Princes Highway, Eden, New South Wales, Australia
22	\N	Tenant	Plumber	12 Princes Highway, Narooma, New South Wales, Australia
23	\N	Tenant	Plumber	346 Princes Highway, Corrimal, New South Wales, Australia
24	\N	Agent	Plumber	2434 Gold Coast Highway, Mermaid Beach, Queensland, Australia
25	\N	Agent	Plumber	234 Princes Highway, Port Fairy, Victoria, Australia
26	\N	Agent	Plumber	234 Princes Highway, Port Fairy, Victoria, Australia
27	\N	Agent	Plumber	56 Princes Highway, Eden, New South Wales, Australia\r\n
28	\N	Agent	Plumber	56 Princes Highway, Eden, New South Wales, Australia
29	\N	Agent	Plumber	45 Princes Highway, Lucknow, Victoria, Australia
30	\N	Tenant	Plumber	345 Princes Highway, Woonona, New South Wales, Australia
31	\N	Tenant	Plumber	34 Princes Highway, Port Fairy, Victoria, Australia\r\n
32	\N	Agent	Plumber	123 Princes Highway, Port Fairy, Victoria, Australia
33	\N	Tenant	Plumber	23
34	\N	Tenant	Plumber	567 George Street, Sydney, New South Wales, Australia
35	\N	Agent	Plumber	345 Princes Highway, Woonona, New South Wales, Australia
36	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
37	\N	Tenant	Plumber	34 Princes Highway, Port Fairy, Victoria, Australia
38	\N	Tenant	Plumber	12 Princes Highway, Narooma, New South Wales, Australia
39	\N	Tenant	Plumber	234 Princes Highway, Port Fairy, Victoria, Australia
40	\N	Tenant	Plumber	56 Princes Highway, Eden, New South Wales, Australia
41	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
42	\N	Tenant	Plumber	567 George Street, Sydney, New South Wales, Australia\r\n
43	\N	Agent	Plumber	456 Oxford Street, Paddington, New South Wales, Australia
44	\N	Agent	Plumber	345 Princes Highway, Woonona, New South Wales, Australia
45	\N	Agent	Plumber	345 Princes Highway, Woonona, New South Wales, Australia
46	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
47	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
48	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
49	\N	Agent	Plumber	34 Princes Highway, Port Fairy, Victoria, Australia
50	\N	Agent	Plumber	345 Princes Highway, Woonona, New South Wales, Australia
51	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
52	\N	Agent	Plumber	567 George Street, Sydney, New South Wales, Australia
53	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
54	\N	Agent	Plumber	345 Princes Highway, Woonona, New South Wales, Australia
55	\N	Agent	Plumber	7465 Goulburn Valley Highway, Kialla West, Victoria, Australia\r\n
56	\N	Agent	Plumber	345 Princes Highway, Woonona, New South Wales, Australia
57	\N	Agent	Plumber	345 Princes Highway, Woonona, New South Wales, Australia
58	\N	Agent	Plumber	567 George Street, Sydney, New South Wales, Australia\r\n
59	\N	Agent	Plumber	567 George Street, Sydney, New South Wales, Australia
60	\N	Agent	Plumber	567 George Street, Sydney, New South Wales, Australia
61	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
62	\N	Agent	Plumber	567 George Street, Sydney, New South Wales, Australia
63	\N	Agent	Plumber	123 Princes Highway, Port Fairy, Victoria, Australia
64	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
65	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
66	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
67	\N	Tenant	Plumber	2345 Albany Highway, Gosnells, Western Australia, Australia
68	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
69	\N	Tenant	Plumber	34511 Princes Highway, Suttontown, South Australia, Australia
70	\N	Tenant	Plumber	1234 hgfdhg
71	\N	Tenant	Plumber	567 George Street, Sydney, New South Wales, Australia
72	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
73	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
74	\N	Tenant	Plumber	35 Princes Highway, Eden, New South Wales, Australia
75	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
76	\N	Tenant	Plumber	1235 Princes Highway, Heathmere, Victoria, Australia\r\n
77	\N	Tenant	Plumber	345 Princes Highway, Woonona, New South Wales, Australia
78	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
79	\N	Tenant	Plumber	345 Princes Highway, Woonona, New South Wales, Australia
80	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
81	\N	Agent	Plumber	1235 Princes Highway, Heathmere, Victoria, Australia
82	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
83	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
84	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
85	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
86	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
87	\N	Agent	Plumber	345 Princes Highway, Woonona, New South Wales, Australia
88	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
89	\N	Agent	Plumber	4893 James Craig Road, Rozelle, New South Wales, Australia
90	\N	Agent	Plumber	567 George Street, Sydney, New South Wales, Australia
91	\N	Agent	Plumber	599 Princes Highway, Heathmere, Victoria, Australia
92	\N	Agent	Electrician	456 Princes Highway, Rockdale, New South Wales, Australia
93	\N	Tenant	Plumber	678 Princes Highway, Nicholson, Victoria, Australia
94	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
95	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
96	\N	Tenant	Plumber	567 George Street, Sydney, New South Wales, Australia
97	\N	Tenant	Plumber	567 George Street, Sydney, New South Wales, Australia
98	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
99	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
100	\N	Tenant	Plumber	45 Princes Highway, Lucknow, Victoria, Australia
101	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
102	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
103	\N	Agent	Plumber	567 George Street, Sydney, New South Wales, Australia
104	\N	Agent	Plumber	234 Collins Street, Melbourne, Victoria, Australia
105	\N	Tenant	Plumber	123 Princes Highway, Port Fairy, Victoria, Australia
106	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
107	\N	Tenant	Plumber	567 George Street, Sydney, New South Wales, Australia
108	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
109	\N	Tenant	Plumber	356 Princes Highway, Dapto, New South Wales, Australia
110	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
111	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
112	\N	Tenant	Electrician	467 Princes Highway, Woonona, New South Wales, Australia
113	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
114	\N	Tenant	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
115	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
116	\N	Agent	Plumber	987 Logan Road, Holland Park West, Queensland, Australia
117	\N	Agent	Plumber	987 Logan Road, Holland Park West, Queensland, Australia
118	\N	Agent	Plumber	987 Logan Road, Holland Park West, Queensland, Australia
119	\N	Tenant	Electrician	567 Chapel Street, South Yarra, Victoria, Australia
120	\N	Tenant	Plumber	987 Pacific Highway, Pymble, New South Wales, Australia
121	\N	Tenant	Plumber	457 Princes Highway, Lucknow, Victoria, Australia
122	\N	Tenant	Plumber	1234 Princes Highway, Heathmere, Victoria, Australia
123	\N	Agent	Plumber	757 George Street, Haymarket, New South Wales, Australia
124	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
125	\N	Agent	Plumber	3456 Pacific Highway, Springwood, Queensland, Australia
126	\N	Agent	Plumber	456 Princes Highway, Rockdale, New South Wales, Australia
127	\N	Tenant	Plumber	567 George Street, Sydney, New South Wales, Australia
128	\N	Agent	Electrician	36 Princes Highway, Eden, New South Wales, Australia
129	\N	Agent	Electrician	2459 Princes Highway, Heywood, Victoria, Australia
130	\N	Agent	Plumber	345 Princes Highway, Woonona, New South Wales, Australia
131	\N	Agent	Plumber	234 Princes Highway, Port Fairy, Victoria, Australia
132	\N	Agent	Plumber	765 Princes Highway, Tempe, New South Wales, Australia
133	\N	Tenant	Plumber	69 Cook Road, Centennial Park, New South Wales, Australia
134	\N	Tenant	Plumber	123 Princes Highway, Port Fairy, Victoria, Australia
135	\N	Agent	Plumber	69 Cook Road, Centennial Park, New South Wales, Australia
136	\N	Agent	Plumber	69 George Street, The Rocks, New South Wales, Australia
\.


--
-- Name: queries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('queries_id_seq', 136, true);


--
-- Data for Name: quote_items; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY quote_items (id, quote_id, item_description, amount, pricing_type, hours, total_per_hour) FROM stdin;
1	1	table	234	Fixed Cost	\N	\N
2	1	celaing 	25	Hourly	4	100
3	2	pipes	200	Fixed Cost	\N	\N
4	3	table 	500	Fixed Cost	\N	\N
5	4	table 2	233	Fixed Cost	\N	\N
6	5	ytrduytrd	24334	Fixed Cost	\N	\N
7	6	table	123	Fixed Cost	\N	\N
8	7	table	45	Fixed Cost	\N	\N
9	8	table	765	Fixed Cost	\N	\N
10	9	table	234	Fixed Cost	\N	\N
11	10	Table	500	Fixed Cost	\N	\N
12	11	table	500	Fixed Cost	\N	\N
13	12	table	456	Fixed Cost	\N	\N
14	13	pipes	500	Fixed Cost	\N	\N
15	13	sink	600	Fixed Cost	\N	\N
16	14	Table	456	Fixed Cost	\N	\N
17	14	chair	438	Fixed Cost	\N	\N
18	15	table	356	Fixed Cost	\N	\N
19	16	table	500	Fixed Cost	\N	\N
20	17	table	700	Fixed Cost	\N	\N
21	18	table 	45	Fixed Cost	\N	\N
22	19	table	560	Fixed Cost	\N	\N
23	20	table	453	Fixed Cost	\N	\N
24	21	table	500	Fixed Cost	\N	\N
25	22	Pipes	300	Fixed Cost	\N	\N
27	22	Wires	200	Fixed Cost	\N	\N
26	22	Labour	20	Hourly	0	0
28	23	table 2	800	Fixed Cost	\N	\N
29	24	table 3	1000	Fixed Cost	\N	\N
30	25	chair	300	Fixed Cost	\N	\N
31	26	table	500	Fixed Cost	\N	\N
32	26	Labour	25	Hourly	\N	\N
33	27	table	780	Fixed Cost	\N	\N
34	28	table	79	Fixed Cost	\N	\N
\.


--
-- Name: quote_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('quote_items_id_seq', 34, true);


--
-- Data for Name: quote_requests; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY quote_requests (id, maintenance_request_id, trady_id, created_at, updated_at, quote_id) FROM stdin;
2	3	1	2017-06-28 05:52:43.517665	2017-06-28 05:52:43.517665	\N
3	4	2	2017-06-28 05:59:32.110468	2017-06-28 05:59:32.110468	\N
4	9	1	2017-06-28 09:44:26.207013	2017-06-28 10:00:55.120356	1
6	19	1	2017-06-28 15:51:25.97279	2017-06-28 15:51:25.97279	\N
7	18	1	2017-06-28 18:40:30.593614	2017-06-28 18:40:30.593614	\N
8	24	1	2017-06-29 05:45:36.699739	2017-06-29 05:45:36.699739	\N
9	23	1	2017-06-29 05:47:44.968724	2017-06-29 05:48:31.152061	2
10	25	1	2017-06-30 11:22:27.851651	2017-07-03 16:25:37.566799	3
11	28	1	2017-07-04 17:01:29.606936	2017-07-04 17:01:29.606936	\N
1	1	1	2017-06-28 05:26:10.179621	2017-07-05 07:14:42.361533	6
12	1	2	2017-07-05 07:23:42.820045	2017-07-05 07:25:05.290072	7
13	27	1	2017-07-05 07:27:11.220704	2017-07-05 07:27:49.011163	8
14	29	1	2017-07-07 07:23:19.62903	2017-07-07 07:36:44.460015	10
16	30	2	2017-07-10 11:34:20.489384	2017-07-10 12:28:39.297387	11
15	30	1	2017-07-10 09:37:45.443731	2017-07-13 03:16:10.945226	12
17	30	3	2017-07-16 11:43:45.181288	2017-07-16 11:43:45.181288	\N
18	57	1	2017-07-16 11:46:04.693487	2017-07-16 11:46:04.693487	\N
19	61	1	2017-07-19 02:49:40.570622	2017-07-19 02:49:40.570622	\N
20	62	1	2017-07-19 17:04:39.03082	2017-07-19 17:04:39.03082	\N
21	61	2	2017-07-19 18:52:18.345701	2017-07-19 18:52:18.345701	\N
22	62	2	2017-07-24 02:55:56.617806	2017-07-24 02:55:56.617806	\N
23	64	1	2017-07-25 16:08:06.701285	2017-07-25 16:09:10.180027	13
25	65	2	2017-07-25 21:17:01.726433	2017-07-25 21:17:01.726433	\N
24	65	1	2017-07-25 21:13:22.023115	2017-07-25 23:05:36.636513	14
26	65	3	2017-07-25 23:15:49.29931	2017-07-25 23:20:25.274606	15
27	80	3	2017-08-08 07:46:59.963786	2017-08-08 07:46:59.963786	\N
28	79	1	2017-08-08 08:16:58.274234	2017-08-08 08:16:58.274234	\N
29	81	1	2017-08-08 23:47:53.008181	2017-08-08 23:47:53.008181	\N
30	81	2	2017-08-08 23:48:28.149089	2017-08-08 23:50:09.464108	18
31	81	3	2017-08-08 23:55:28.657134	2017-08-09 00:01:56.98413	19
32	77	4	2017-08-09 02:39:32.938415	2017-08-09 02:39:32.938415	\N
33	76	1	2017-08-09 06:37:18.871211	2017-08-09 06:37:18.871211	\N
34	74	1	2017-08-09 07:42:51.743513	2017-08-09 07:42:51.743513	\N
35	87	1	2017-08-16 05:11:47.957634	2017-08-16 05:12:33.472123	20
36	89	1	2017-08-21 03:01:13.41634	2017-08-21 03:05:45.709949	21
37	71	1	2017-08-21 04:06:08.030863	2017-08-21 06:08:21.895928	22
38	71	2	2017-08-21 04:06:25.691036	2017-08-21 07:05:57.557168	23
39	71	3	2017-08-21 04:07:07.486885	2017-08-21 07:09:59.885281	24
40	88	1	2017-08-21 08:57:41.065647	2017-08-21 19:13:17.009526	26
41	91	1	2017-08-22 02:37:35.619586	2017-08-22 02:39:05.0124	27
42	93	1	2017-08-24 05:34:21.651641	2017-08-24 05:34:21.651641	\N
43	93	5	2017-08-24 05:37:43.477774	2017-08-24 05:37:43.477774	\N
44	93	4	2017-08-24 05:40:24.629258	2017-08-24 05:40:24.629258	\N
\.


--
-- Name: quote_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('quote_requests_id_seq', 44, true);


--
-- Data for Name: quotes; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY quotes (id, amount, maintenance_request_id, created_at, updated_at, trady_id, status, delivery_status, tax, gst_amount, forwarded_to_landlord, quote_number, trady_quote_reference) FROM stdin;
22	500	71	2017-08-21 05:09:19.881022	2017-08-21 07:11:45.497704	1	Approved	t	t	45.4549999999999983	\N	Q504c435ca4	\N
9	234	28	2017-07-07 04:00:45.528058	2017-07-07 04:00:45.544107	1	Active	f	t	21.2729999999999997	\N	\N	\N
23	800	71	2017-08-21 07:05:50.964926	2017-08-21 07:11:45.634357	2	Declined	t	t	72.7270000000000039	\N	Q91e172132d	\N
24	1000	71	2017-08-21 07:09:50.269267	2017-08-21 07:11:45.651079	3	Declined	t	t	90.909000000000006	\N	Q923091e44a	\N
1	334	9	2017-06-28 10:00:51.569233	2017-06-28 10:34:35.589121	1	Approved	t	t	30.3640000000000008	\N	\N	\N
14	894	65	2017-07-25 23:05:07.713338	2017-07-25 23:58:07.988516	1	Approved	t	t	81.2729999999999961	t	Q8a17d3f146	\N
15	356	65	2017-07-25 23:20:19.40056	2017-07-25 23:58:07.67302	3	Declined	t	t	32.3639999999999972	t	Q1c55345399	\N
2	200	23	2017-06-29 05:48:24.63558	2017-06-29 06:06:01.750945	1	Approved	t	t	18.1819999999999986	t	\N	\N
10	500	29	2017-07-07 07:34:38.323941	2017-07-07 07:47:36.666744	1	Approved	t	t	45.4549999999999983	\N	\N	\N
16	500	66	2017-08-08 06:41:25.542939	2017-08-08 06:41:25.568944	1	Active	f	t	45.4549999999999983	\N	Q826e6d26e5	\N
25	300	71	2017-08-21 08:20:05.826802	2017-08-21 08:20:11.320766	1	Active	t	t	27.2729999999999997	\N	Q82b8f4c059	\N
17	700	66	2017-08-08 08:30:52.014956	2017-08-08 08:47:54.533042	1	Active	t	t	63.6360000000000028	\N	Q4031c0f7e2	\N
26	525	88	2017-08-21 19:12:59.219945	2017-08-21 19:13:17.036963	1	Active	t	t	47.7269999999999968	\N	Q82d0ac9e37	this is a test 1234
27	780	91	2017-08-22 02:38:50.132788	2017-08-22 02:39:05.017076	1	Active	t	t	70.909000000000006	\N	Q0e2f04871e	
3	500	25	2017-07-03 16:25:18.791877	2017-07-03 17:00:01.770844	1	Declined	t	t	45.4549999999999983	\N	\N	\N
28	79	65	2017-08-23 02:38:24.537626	2017-08-23 02:38:28.517331	1	Active	t	t	7.18200000000000038	\N	Q08cdac91e8	aisuhasoifd
19	560	81	2017-08-08 23:58:27.692246	2017-08-09 00:07:58.858699	3	Declined	t	t	50.9089999999999989	\N	Qb96d543dee	\N
18	45	81	2017-08-08 23:50:01.676349	2017-08-09 00:07:58.943513	2	Approved	t	t	4.09100000000000019	t	Q966801bb5e	\N
20	453	87	2017-08-16 05:12:29.511788	2017-08-16 05:12:33.482538	1	Active	t	t	41.1820000000000022	\N	Q767aceaf55	\N
5	24334	25	2017-07-03 16:40:28.207488	2017-07-03 17:06:57.956167	1	Declined	t	f	0	\N	\N	\N
4	233	25	2017-07-03 16:31:38.178829	2017-07-03 17:06:58.000699	1	Approved	t	t	21.1819999999999986	\N	\N	\N
11	500	30	2017-07-10 12:23:25.819071	2017-07-13 04:14:35.789249	2	Declined	t	t	45.4549999999999983	t	\N	\N
12	456	30	2017-07-13 03:16:03.838888	2017-07-13 04:14:35.963082	1	Approved	t	t	41.4549999999999983	t	\N	\N
13	1100	64	2017-07-25 16:09:04.101853	2017-07-25 16:09:10.190616	1	Active	t	t	100	\N	Qd7b908e717	\N
8	765	27	2017-07-05 07:27:41.410145	2017-07-05 07:27:49.01616	1	Active	t	t	69.5450000000000017	\N	\N	\N
6	123	1	2017-07-05 07:14:34.670354	2017-07-06 06:44:49.470295	1	Approved	t	t	11.1820000000000004	\N	\N	\N
7	45	1	2017-07-05 07:24:55.317727	2017-07-06 06:44:49.597325	2	Declined	t	t	4.09100000000000019	\N	\N	\N
21	500	89	2017-08-21 03:04:04.688288	2017-08-21 03:06:53.945222	1	Approved	t	t	45.4549999999999983	\N	Qa805b2ed7b	\N
\.


--
-- Name: quotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('quotes_id_seq', 28, true);


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY roles (id, user_id, roleable_type, roleable_id, created_at, updated_at) FROM stdin;
1	1	God	1	2017-06-28 04:22:25.388158	2017-06-28 04:22:25.388158
2	2	AgencyAdmin	1	2017-06-28 04:41:11.116427	2017-06-28 04:41:11.116427
3	3	Tenant	1	2017-06-28 05:24:33.228728	2017-06-28 05:24:33.268816
4	4	Trady	1	2017-06-28 05:26:10.076675	2017-06-28 05:26:10.087522
5	5	Trady	2	2017-06-28 05:59:32.006332	2017-06-28 05:59:32.016184
6	6	Landlord	1	2017-06-28 06:00:54.074263	2017-06-28 06:00:54.074263
7	7	Tenant	2	2017-06-28 09:19:45.718522	2017-06-28 09:19:45.72713
8	8	Agent	1	2017-06-30 06:09:48.509504	2017-06-30 06:09:48.53857
9	9	Tenant	3	2017-06-30 12:51:41.749832	2017-06-30 12:51:41.789342
10	10	Trady	3	2017-07-16 11:43:45.014812	2017-07-16 11:43:45.038927
11	11	Tenant	4	2017-07-16 12:11:45.222057	2017-07-16 12:11:45.261884
12	12	Tenant	5	2017-07-16 12:11:45.694905	2017-07-16 12:11:45.703643
18	3	AgencyAdmin	7	2017-07-16 16:31:04.445699	2017-07-16 16:31:04.445699
19	13	Landlord	2	2017-07-19 02:20:50.727396	2017-07-19 02:20:50.727396
20	14	Tenant	6	2017-07-21 02:45:05.228716	2017-07-21 02:45:05.26975
21	15	Tenant	7	2017-07-26 00:34:22.172021	2017-07-26 00:34:22.20603
22	16	Tenant	8	2017-07-26 06:05:19.938896	2017-07-26 06:05:19.989585
23	18	Agent	2	2017-07-27 04:25:59.399443	2017-07-27 04:25:59.431278
24	\N	Tenant	9	2017-07-31 20:59:24.747856	2017-07-31 20:59:24.79737
25	19	Landlord	3	2017-08-07 08:24:00.86977	2017-08-07 08:24:00.86977
26	20	Trady	4	2017-08-09 02:39:32.826528	2017-08-09 02:39:32.851269
27	21	AgencyAdmin	8	2017-08-09 06:01:29.517475	2017-08-09 06:01:29.517475
28	22	Trady	5	2017-08-24 05:37:43.344827	2017-08-24 05:37:43.371888
\.


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('roles_id_seq', 28, true);


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY schema_migrations (version) FROM stdin;
20161108022134
20161124065552
20161124075827
20161125003025
20161125030708
20161125063126
20161127092248
20161127101749
20161127104718
20161127234647
20161127234950
20161128043513
20161130013152
20161202055816
20161204082353
20161206023145
20161206081857
20161207044711
20161208041317
20161209055549
20161211033129
20161211081521
20161212000726
20161212001208
20161212001910
20161212003543
20161214032910
20161214061911
20161214091835
20161214123733
20161218231144
20161219005129
20161219020636
20161219024823
20161219233011
20161219234154
20161220053213
20161221033758
20161221034112
20161221034720
20161222040408
20161228021035
20161228034417
20161228035606
20161228051635
20170103031335
20170103033912
20170103051108
20170103052500
20170103065655
20170103085836
20170103091641
20170106054642
20170106065143
20170106110903
20170110103619
20170111013159
20170111040454
20170112043512
20170116052921
20170119023519
20170119092101
20170124113130
20170124113705
20170124234746
20170202043351
20170204042834
20170207024212
20170207085449
20170208055230
20170209014237
20170209044340
20170211031315
20170214004725
20170217041052
20170218061338
20170218101453
20170222084414
20170308111152
20170313025633
20170313112557
20170314121430
20170315081632
20170315083145
20170315083718
20170316053930
20170316054815
20170316070701
20170316133500
20170317032211
20170321065155
20170322070217
20170323120320
20170328071950
20170329085349
20170329115513
20170331054800
20170331082541
20170419062431
20170427052705
20170427053304
20170504070551
20170504124742
20170510083104
20170516032318
20170517135328
20170522062830
20170522145844
20170523170207
20170529054811
20170605060818
20170605085059
20170608054734
20170613042119
20170622075345
20170623053354
20170625175622
20170627154719
20170703053333
20170711073428
20170726050905
20170726055523
20170728025357
20170803072625
20170815022459
20170821052006
20170822044209
\.


--
-- Data for Name: service_needs; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY service_needs (id) FROM stdin;
\.


--
-- Name: service_needs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('service_needs_id_seq', 1, false);


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY services (id, service, created_at, updated_at, god_id) FROM stdin;
1	Plumber	2017-06-28 04:22:25.468863	2017-06-28 04:22:25.468863	1
2	Electrician	2017-06-28 04:22:25.478109	2017-06-28 04:22:25.478109	1
3	Carpenter	2017-06-28 04:22:25.486086	2017-06-28 04:22:25.486086	1
\.


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('services_id_seq', 3, true);


--
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY skills (id, skill, trady_id, created_at, updated_at) FROM stdin;
1	Plumber	1	2017-06-28 05:26:10.09531	2017-06-28 05:26:10.09531
2	Electrician	1	2017-06-28 05:52:43.474967	2017-06-28 05:52:43.474967
3	Electrician	2	2017-06-28 05:59:32.026336	2017-06-28 05:59:32.026336
4	Plumber	2	2017-07-05 07:23:42.769017	2017-07-05 07:23:42.769017
5	Plumber	3	2017-07-16 11:43:45.053345	2017-07-16 11:43:45.053345
6	Plumber	4	2017-08-09 02:39:32.858901	2017-08-09 02:39:32.858901
7	Plumber	5	2017-08-24 05:37:43.388789	2017-08-24 05:37:43.388789
\.


--
-- Name: skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('skills_id_seq', 7, true);


--
-- Data for Name: super_ledgers; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY super_ledgers (id, created_at, updated_at, maintenance_request_id, ledger_id, grand_total) FROM stdin;
\.


--
-- Name: super_ledgers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('super_ledgers_id_seq', 1, false);


--
-- Data for Name: tenant_maintenance_requests; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY tenant_maintenance_requests (id, tenant_id, maintenance_request_id, created_at, updated_at) FROM stdin;
1	1	1	2017-06-28 05:24:34.354943	2017-06-28 05:24:34.354943
2	1	2	2017-06-28 05:27:11.540639	2017-06-28 05:27:11.540639
3	1	3	2017-06-28 05:51:58.16575	2017-06-28 05:51:58.16575
4	1	4	2017-06-28 05:59:00.25235	2017-06-28 05:59:00.25235
5	1	5	2017-06-28 07:43:43.581405	2017-06-28 07:43:43.581405
6	1	6	2017-06-28 07:53:31.440642	2017-06-28 07:53:31.440642
7	1	7	2017-06-28 08:49:03.057499	2017-06-28 08:49:03.057499
8	1	8	2017-06-28 09:19:45.632317	2017-06-28 09:19:45.632317
9	2	8	2017-06-28 09:19:45.733784	2017-06-28 09:19:45.733784
10	1	9	2017-06-28 09:31:40.589335	2017-06-28 09:31:40.589335
11	2	9	2017-06-28 09:31:40.607558	2017-06-28 09:31:40.607558
12	1	10	2017-06-28 14:30:04.165747	2017-06-28 14:30:04.165747
13	1	11	2017-06-28 14:50:42.693395	2017-06-28 14:50:42.693395
14	1	12	2017-06-28 14:52:48.801245	2017-06-28 14:52:48.801245
15	1	13	2017-06-28 14:59:05.263155	2017-06-28 14:59:05.263155
16	1	14	2017-06-28 15:01:04.489821	2017-06-28 15:01:04.489821
17	1	15	2017-06-28 15:08:01.121504	2017-06-28 15:08:01.121504
18	1	16	2017-06-28 15:11:20.129165	2017-06-28 15:11:20.129165
19	1	17	2017-06-28 15:13:21.797726	2017-06-28 15:13:21.797726
20	1	18	2017-06-28 15:17:55.582585	2017-06-28 15:17:55.582585
21	1	19	2017-06-28 15:43:27.154201	2017-06-28 15:43:27.154201
22	1	20	2017-06-29 04:11:51.442802	2017-06-29 04:11:51.442802
23	1	21	2017-06-29 04:13:45.779852	2017-06-29 04:13:45.779852
24	1	22	2017-06-29 04:58:19.45864	2017-06-29 04:58:19.45864
25	1	23	2017-06-29 05:01:38.777966	2017-06-29 05:01:38.777966
26	1	24	2017-06-29 05:07:05.826787	2017-06-29 05:07:05.826787
27	1	25	2017-06-29 08:35:48.156494	2017-06-29 08:35:48.156494
28	1	26	2017-06-30 12:41:02.573331	2017-06-30 12:41:02.573331
29	3	27	2017-06-30 12:51:41.873042	2017-06-30 12:51:41.873042
30	1	28	2017-07-04 17:00:58.944238	2017-07-04 17:00:58.944238
31	1	29	2017-07-06 10:24:18.368037	2017-07-06 10:24:18.368037
32	1	30	2017-07-10 09:25:54.968853	2017-07-10 09:25:54.968853
33	1	31	2017-07-11 08:45:53.416283	2017-07-11 08:45:53.416283
34	1	32	2017-07-12 08:43:37.447194	2017-07-12 08:43:37.447194
35	1	33	2017-07-12 08:46:42.043127	2017-07-12 08:46:42.043127
36	1	34	2017-07-12 08:57:12.080408	2017-07-12 08:57:12.080408
37	1	35	2017-07-12 09:02:24.802571	2017-07-12 09:02:24.802571
38	1	36	2017-07-12 09:43:59.864109	2017-07-12 09:43:59.864109
39	1	37	2017-07-12 09:48:16.604861	2017-07-12 09:48:16.604861
40	1	38	2017-07-12 09:51:10.038491	2017-07-12 09:51:10.038491
41	1	39	2017-07-12 09:56:59.582485	2017-07-12 09:56:59.582485
42	1	40	2017-07-12 10:00:33.999316	2017-07-12 10:00:33.999316
43	1	41	2017-07-12 10:28:38.286467	2017-07-12 10:28:38.286467
44	1	42	2017-07-12 10:31:15.670147	2017-07-12 10:31:15.670147
45	1	43	2017-07-12 13:46:17.676248	2017-07-12 13:46:17.676248
46	1	44	2017-07-12 13:49:33.187778	2017-07-12 13:49:33.187778
47	1	45	2017-07-12 14:21:24.699341	2017-07-12 14:21:24.699341
48	1	46	2017-07-12 14:31:09.745258	2017-07-12 14:31:09.745258
49	1	47	2017-07-12 14:37:08.855193	2017-07-12 14:37:08.855193
50	1	48	2017-07-14 07:31:50.967853	2017-07-14 07:31:50.967853
51	1	49	2017-07-14 07:38:21.725787	2017-07-14 07:38:21.725787
52	1	50	2017-07-14 07:40:44.30308	2017-07-14 07:40:44.30308
53	1	51	2017-07-14 07:44:05.570468	2017-07-14 07:44:05.570468
54	1	52	2017-07-14 08:03:57.847134	2017-07-14 08:03:57.847134
55	1	53	2017-07-14 08:07:44.856825	2017-07-14 08:07:44.856825
56	1	54	2017-07-14 08:09:56.983605	2017-07-14 08:09:56.983605
57	1	55	2017-07-14 08:11:21.611623	2017-07-14 08:11:21.611623
58	1	56	2017-07-14 08:12:48.213496	2017-07-14 08:12:48.213496
59	1	57	2017-07-14 10:31:31.344623	2017-07-14 10:31:31.344623
60	4	58	2017-07-16 12:11:45.594055	2017-07-16 12:11:45.594055
61	5	58	2017-07-16 12:11:45.708506	2017-07-16 12:11:45.708506
62	1	59	2017-07-16 14:15:16.364128	2017-07-16 14:15:16.364128
63	1	60	2017-07-16 15:38:28.019239	2017-07-16 15:38:28.019239
64	1	61	2017-07-16 15:39:32.195728	2017-07-16 15:39:32.195728
65	1	62	2017-07-19 16:54:07.250164	2017-07-19 16:54:07.250164
66	6	63	2017-07-21 02:45:05.440239	2017-07-21 02:45:05.440239
67	1	64	2017-07-25 16:05:15.25882	2017-07-25 16:05:15.25882
68	1	65	2017-07-25 20:15:51.129571	2017-07-25 20:15:51.129571
69	7	66	2017-07-26 00:34:22.376126	2017-07-26 00:34:22.376126
70	1	67	2017-07-26 00:49:47.46487	2017-07-26 00:49:47.46487
71	1	68	2017-07-26 00:56:32.489993	2017-07-26 00:56:32.489993
72	8	69	2017-07-26 06:05:20.230361	2017-07-26 06:05:20.230361
73	1	70	2017-07-27 04:27:44.873162	2017-07-27 04:27:44.873162
74	1	71	2017-07-28 07:45:42.727432	2017-07-28 07:45:42.727432
75	1	74	2017-07-31 05:33:59.766771	2017-07-31 05:33:59.766771
76	1	75	2017-07-31 20:59:24.649303	2017-07-31 20:59:24.649303
77	9	75	2017-07-31 20:59:24.832195	2017-07-31 20:59:24.832195
78	1	76	2017-08-07 02:42:06.188843	2017-08-07 02:42:06.188843
79	1	77	2017-08-07 02:58:29.638147	2017-08-07 02:58:29.638147
80	1	78	2017-08-07 08:20:35.62167	2017-08-07 08:20:35.62167
81	1	79	2017-08-08 05:00:21.949188	2017-08-08 05:00:21.949188
82	1	80	2017-08-08 05:10:09.048851	2017-08-08 05:10:09.048851
83	1	81	2017-08-08 23:31:52.112774	2017-08-08 23:31:52.112774
84	1	82	2017-08-09 07:10:31.778326	2017-08-09 07:10:31.778326
85	1	83	2017-08-09 20:33:12.563109	2017-08-09 20:33:12.563109
86	1	84	2017-08-09 20:34:12.532433	2017-08-09 20:34:12.532433
87	1	85	2017-08-09 21:22:26.529764	2017-08-09 21:22:26.529764
88	1	86	2017-08-15 05:08:21.317478	2017-08-15 05:08:21.317478
89	1	87	2017-08-16 04:24:12.268248	2017-08-16 04:24:12.268248
90	1	88	2017-08-17 17:49:43.340507	2017-08-17 17:49:43.340507
91	1	89	2017-08-18 06:10:38.73263	2017-08-18 06:10:38.73263
92	1	90	2017-08-22 00:55:12.19573	2017-08-22 00:55:12.19573
93	1	91	2017-08-22 02:29:30.734557	2017-08-22 02:29:30.734557
94	1	92	2017-08-22 22:38:42.552126	2017-08-22 22:38:42.552126
95	1	93	2017-08-23 02:36:22.693131	2017-08-23 02:36:22.693131
\.


--
-- Name: tenant_maintenance_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('tenant_maintenance_requests_id_seq', 95, true);


--
-- Data for Name: tenants; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY tenants (id, full_name, email, mobile, property_id, user_id, created_at, updated_at, name) FROM stdin;
1	\N	rita@email.com	12345639845	36	3	2017-06-28 05:24:33.254236	2017-08-23 02:36:22.471855	rita
2	\N	bob@email.com	1827634981	1	7	2017-06-28 09:19:45.721045	2017-06-28 09:31:40.611116	bobby
3	\N	bbxapp@gmail.com	18276439816	15	9	2017-06-30 12:51:41.776684	2017-06-30 12:51:41.776684	ronaldo
4	\N	joshephina@email.com	91837409287	24	11	2017-07-16 12:11:45.248033	2017-07-16 12:11:45.248033	phina
5	\N	stalin@email.com	9832475987	24	12	2017-07-16 12:11:45.698222	2017-07-16 12:11:45.698222	staline
6	\N	theocat@email.com	23405983450	3	14	2017-07-21 02:45:05.252805	2017-07-21 02:45:05.252805	theo
7	\N	rita@emial.com	92837094823	26	15	2017-07-26 00:34:22.199131	2017-07-26 00:34:22.199131	rita
8	\N	west@email.com	23845702938	3	16	2017-07-26 06:05:19.970609	2017-07-26 06:05:19.970609	kanye
9	\N			3	\N	2017-07-31 20:59:24.775314	2017-07-31 20:59:24.775314	
\.


--
-- Name: tenants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('tenants_id_seq', 9, true);


--
-- Data for Name: tradies; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY tradies (id, name, mobile, email, user_id, skill, created_at, updated_at, trady_company_id, company_name) FROM stdin;
1	handy man	12376512874	handyman@email.com	4	\N	2017-06-28 05:26:10.084655	2017-06-28 09:47:40.878924	1	handy man
2	elon	12763481726	tesla@email.com	5	\N	2017-06-28 05:59:32.013823	2017-07-05 07:24:41.239033	2	Electric Tesla
3	electro	93284759082	electro@email.com	10	\N	2017-07-16 11:43:45.035552	2017-07-25 23:20:09.950756	3	Electro
4	biology	28347509823	bio@email.com	20	\N	2017-08-09 02:39:32.848616	2017-08-09 02:39:32.848616	\N	Bio inc
5	Peter Pipe	23874569283	peterpipes@email.com	22	\N	2017-08-24 05:37:43.35806	2017-08-24 05:37:43.35806	\N	Pipes to go 
\.


--
-- Name: tradies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('tradies_id_seq', 5, true);


--
-- Data for Name: trady_companies; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY trady_companies (id, company_name, trading_name, abn, gst_registration, address, mailing_address_same, mailing_address, mobile_number, email, created_at, updated_at, account_name, bsb_number, bank_account_number, trady_id) FROM stdin;
2	Electric Tesla	Tesla	128374190826482174	t	123 street	\N	123 street	12763481726	tesla@email.com	2017-07-05 07:24:41.231328	2017-07-05 07:24:41.231328	Teslas Bank	239845283764589	29384570923875490	\N
3	Electro	electro	1287340921743	t	123 electic avenue	\N	123 electic avenue	93284759082	electro@email.com	2017-07-25 23:20:09.928039	2017-07-25 23:20:09.928039	Electric Account	238450983457098	23049587029385	\N
1	handy man	Handy Man 	1298374192899999	t	123 street	\N	123 street	12376512874	handyman@email.com	2017-06-28 09:47:40.87562	2017-08-08 08:47:26.386352	handy man Account	12384712694387234	3182746781263489127439	\N
\.


--
-- Name: trady_companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('trady_companies_id_seq', 3, true);


--
-- Data for Name: trady_statuses; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY trady_statuses (id, maintenance_request_id, status, created_at, updated_at) FROM stdin;
1	1	Quote Requested	2017-06-28 05:26:10.147573	2017-06-28 05:26:10.147573
2	4	Quote Requested	2017-06-28 05:59:32.074719	2017-06-28 05:59:32.074719
3	30	Quote Requested	2017-07-16 11:43:45.125287	2017-07-16 11:43:45.125287
4	77	Quote Requested	2017-08-09 02:39:32.905266	2017-08-09 02:39:32.905266
5	93	Quote Requested	2017-08-24 05:37:43.452538	2017-08-24 05:37:43.452538
\.


--
-- Name: trady_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('trady_statuses_id_seq', 5, true);


--
-- Data for Name: uploaded_invoices; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY uploaded_invoices (id, invoices, maintenance_request_id, created_at, updated_at, trady_id, delivery_status, invoice_data, pdf_data, url) FROM stdin;
1	{#<ActionDispatch::Http::UploadedFile:0x007fbed4d814f0>}	30	2017-07-27 04:41:56.043636	2017-07-27 04:41:56.043636	1	\N	\N	\N	\N
2	{}	30	2017-07-28 08:52:59.554215	2017-07-28 08:52:59.554215	1	\N	\N	\N	\N
3	{}	30	2017-07-28 08:54:37.231762	2017-07-28 08:54:37.231762	1	\N	\N	\N	\N
19	{}	66	2017-08-07 03:07:09.97213	2017-08-07 03:52:55.144676	1	t	\N	{"id":"b924bab5ef644f2397734d6467de3d5f.pdf","storage":"store","metadata":{"size":154709,"filename":"Invoice - GO - LD0004.pdf","mime_type":"application/pdf"}}	https://maintenance-app.s3-ap-southeast-2.amazonaws.com/store/b924bab5ef644f2397734d6467de3d5f.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJK2TW2FXHCOMIPQQ%2F20170807%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20170807T030711Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=65a45a206f2826a844c9c2b4012e632394527a5bbb1156c1a6d20a76098b3afc
\.


--
-- Name: uploaded_invoices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('uploaded_invoices_id_seq', 19, true);


--
-- Data for Name: uploaded_quotes; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY uploaded_quotes (id, quotes, maintenance_request_id, delivery_status, trady_id, created_at, updated_at, status) FROM stdin;
\.


--
-- Name: uploaded_quotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('uploaded_quotes_id_seq', 1, false);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY urls (id, short_url, original_url, created_at, updated_at) FROM stdin;
\.


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('urls_id_seq', 1, false);


--
-- Data for Name: user_conversations; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY user_conversations (id, user_id, conversation_id, created_at, updated_at) FROM stdin;
1	2	1	2017-06-28 09:43:15.622472	2017-06-28 09:43:15.622472
2	2	2	2017-06-28 09:43:59.985483	2017-06-28 09:43:59.985483
3	2	3	2017-06-28 10:06:25.357675	2017-06-28 10:06:25.357675
4	2	4	2017-07-03 05:51:52.254453	2017-07-03 05:51:52.254453
5	2	5	2017-07-03 06:04:24.946612	2017-07-03 06:04:24.946612
6	2	6	2017-07-03 10:40:15.797948	2017-07-03 10:40:15.797948
7	2	7	2017-07-04 08:13:19.441659	2017-07-04 08:13:19.441659
8	6	8	2017-07-04 13:21:12.3161	2017-07-04 13:21:12.3161
9	2	8	2017-07-04 13:27:03.910089	2017-07-04 13:27:03.910089
10	2	9	2017-07-04 15:07:21.506546	2017-07-04 15:07:21.506546
11	2	10	2017-07-04 16:00:58.903571	2017-07-04 16:00:58.903571
12	4	10	2017-07-04 16:03:10.588564	2017-07-04 16:03:10.588564
13	3	11	2017-07-05 06:39:35.094629	2017-07-05 06:39:35.094629
14	2	12	2017-07-05 06:40:24.803457	2017-07-05 06:40:24.803457
15	2	11	2017-07-05 06:40:35.049954	2017-07-05 06:40:35.049954
16	4	13	2017-07-05 07:16:05.180378	2017-07-05 07:16:05.180378
17	2	13	2017-07-05 07:18:47.026845	2017-07-05 07:18:47.026845
18	2	14	2017-07-10 08:36:48.246857	2017-07-10 08:36:48.246857
19	2	15	2017-07-10 09:33:28.803865	2017-07-10 09:33:28.803865
20	2	16	2017-07-13 04:37:27.740845	2017-07-13 04:37:27.740845
21	3	17	2017-07-13 04:38:51.084021	2017-07-13 04:38:51.084021
22	2	18	2017-07-14 19:05:49.693791	2017-07-14 19:05:49.693791
23	3	18	2017-07-14 19:06:06.016588	2017-07-14 19:06:06.016588
24	2	19	2017-07-19 17:02:53.70742	2017-07-19 17:02:53.70742
25	6	20	2017-07-25 20:50:18.575472	2017-07-25 20:50:18.575472
26	2	20	2017-07-25 20:52:42.452603	2017-07-25 20:52:42.452603
27	3	21	2017-07-25 22:39:05.847984	2017-07-25 22:39:05.847984
28	2	22	2017-07-25 23:12:02.616976	2017-07-25 23:12:02.616976
29	4	22	2017-07-25 23:12:56.021356	2017-07-25 23:12:56.021356
30	6	23	2017-08-01 23:38:32.945626	2017-08-01 23:38:32.945626
31	2	24	2017-08-08 05:11:52.752759	2017-08-08 05:11:52.752759
32	3	24	2017-08-08 05:13:14.852288	2017-08-08 05:13:14.852288
33	6	25	2017-08-08 05:36:19.631852	2017-08-08 05:36:19.631852
34	4	26	2017-08-08 06:58:03.325326	2017-08-08 06:58:03.325326
35	2	26	2017-08-08 07:09:06.383024	2017-08-08 07:09:06.383024
36	3	27	2017-08-08 23:44:36.472858	2017-08-08 23:44:36.472858
37	2	27	2017-08-08 23:45:04.742931	2017-08-08 23:45:04.742931
38	19	28	2017-08-08 23:47:04.794145	2017-08-08 23:47:04.794145
39	2	29	2017-08-08 23:55:57.441422	2017-08-08 23:55:57.441422
40	5	29	2017-08-08 23:56:47.245274	2017-08-08 23:56:47.245274
41	2	30	2017-08-09 00:07:52.006719	2017-08-09 00:07:52.006719
\.


--
-- Name: user_conversations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('user_conversations_id_seq', 41, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: Ron
--

COPY users (id, email, crypted_password, salt, created_at, updated_at, reset_password_token, reset_password_token_expires_at, reset_password_email_sent_at, set_password_token, id_token) FROM stdin;
1	martin@email.com	$2a$10$PkSg4d0vYDqgAK8qbHoYeuh1sNxHo8PQlHcLoR1jAv98su2t.odGG	8Hoxu5zpxCi6NJW3zGrt	2017-06-28 04:22:25.334074	2017-06-28 04:22:25.334074	\N	\N	\N	403e5d5f0f14123a6323	1fe60320a72c80e19831
19	americo@email.com	$2a$10$BIx/ZAwwYa0LLsH.2Frnp.l3bFEv5yaBEaU.Ix7XWI3dGGNpP65uW	NFSx1X1x6cDCVj22xzKy	2017-08-07 08:24:00.776853	2017-08-07 08:24:00.776853	\N	\N	\N	89a5a2a20e06bc560aa6	1e1b1a40703a55c9bc30
3	rita@email.com	$2a$10$53lLSD/bjGve75e8FthmOurVGeExYxm08XP8uZX9pyHDLOeoRCl5i	UFDQ25QKxxqP2pCiUiBo	2017-06-28 05:24:33.203308	2017-06-28 05:24:55.43965	\N	\N	\N	82e077e73cc035a06dd7	90cc07493102fcf39898
20	bio@email.com	$2a$10$cnLB0fYxcQiKnyWO0b7AmugCWJPuJGCGPxJUkV0l6uDk2hHHn46sG	Pq5JByPyynAF2jkc8hTF	2017-08-09 02:39:32.768113	2017-08-09 02:39:32.768113	\N	\N	\N	c7d7c15f2bc09318569d	a62c0c24df928dcb9a15
6	bernard@email.com	$2a$10$21ca7PZEZlEqTny6c.50FOccVQ5F1GmRtYb6kHDlhtWDLZ39sGu7u	zKw5RvXNmKkk88LuKiF4	2017-06-28 06:00:54.02452	2017-06-28 07:12:15.844555	\N	\N	\N	49f1d6875479750af94c	fc49d24d1f41e689cb85
7	bob@email.com	$2a$10$3oetA.lsYAN/qfcfTt0C.e9ElW3/8IxJGW5aSLYJlmsYagbchOKg.	1mu9jsUGWNzgZxG9Kt72	2017-06-28 09:19:45.7118	2017-06-28 09:19:45.7118	\N	\N	\N	d7f25bd5526021ac8af3	a5d936a65c606fa56923
4	handyman@email.com	$2a$10$p6hWUr/03Gag9LWZSpwar.egMxhOryWW1HIvxc/biyBTsl3gf1Rdi	tPjwZ2hqjjjMspT5sxZS	2017-06-28 05:26:10.052543	2017-06-28 10:03:56.938327	\N	\N	2017-06-28 10:03:43.258743	654a57bd8faef7fafff5	fa4a2cd370d27de9a51c
2	martin@maintenanceapp.com.au	$2a$10$sYj77lCMlIGLOx8n.MzWpe7qKugaLnwRJfU9W8QvSZUoRLZ53ybwO	E9mxpUTtjzQQ6C6j9mbm	2017-06-28 04:41:11.062663	2017-06-28 04:41:11.062663	PPRVfWHf8B1Mjx7YUzCV	\N	2017-06-28 18:34:02.183086	af974bd01c250d3c0000	bb3d577a1769e7d933a0
21	amy@email.com	$2a$10$CY4E8cm/oqOQsrEPmsFGveJnc1T7yRbENlrldzNPwxQNWp6rHCOEO	6wW7t1FQSCVz3e5gWabh	2017-08-09 06:01:29.463963	2017-08-09 06:01:29.463963	\N	\N	\N	673fb497e9dee271fc24	b144f40e39ba0ac05ba6
8	agent@email.com	$2a$10$MTfw6jdAYDSGmh4UiMaJbOOuv/CFhbvVwRwtg7SC.NFk2pe7pZGzS	AdPNYzKdELrc3SkmsKhw	2017-06-30 06:09:48.449772	2017-06-30 06:13:03.946169	\N	\N	\N	8bf4870eda12099c18cb	bab1a17852e226419816
9	bbxapp@gmail.com	$2a$10$RhXwQNC7fl4.xilGG9nGTuj2l16ftt4S.NOBCwugpsQLSXlrPmdYW	6QGdfo4sMUqqXYs8ffvQ	2017-06-30 12:51:41.716894	2017-06-30 12:51:41.716894	\N	\N	\N	7e0dc1621f012b7bf436	5a482ba9554f083ee230
5	tesla@email.com	$2a$10$CnFvB4ebgBtiVZ.XMhglG.Iei6TlIuoDt09Qsfj7zJEx1Yz2UphgG	ngqyK5YfDRP6528Vo6fT	2017-06-28 05:59:31.97732	2017-07-03 02:51:55.93975	\N	\N	2017-07-03 02:51:43.969816	d53cef7c25208309bfd0	3bfeb378265c1c72505e
10	electro@email.com	$2a$10$7zE1v75RnDNMFq/771ExkO5yFIyBplk0txsGzF7VA5N1nV7ME8JjC	zohXsvnfZ1B4ovNxpjo7	2017-07-16 11:43:44.940469	2017-07-16 11:43:44.940469	\N	\N	\N	1ce8780d2adf170f5e27	d62f221cea82420c7d3d
11	joshephina@email.com	$2a$10$EAJ5PlgjSZYlBDcOCBQxjODTfAAFZlB1zsY/TjKf.cJZAacZjTQtK	RYcjVbz58xqzQK29AMKc	2017-07-16 12:11:45.190926	2017-07-16 12:11:45.190926	\N	\N	\N	3de5dcff68e48acb7d5f	ef62d1b78ddced96a279
12	stalin@email.com	$2a$10$aRK3Sk02AOJY6LIesjhbNurgUw3qreft3KD.0lgFmqdqq.JrBk/dC	R1tymBxyysFD5JbmPBH2	2017-07-16 12:11:45.686832	2017-07-16 12:11:45.686832	\N	\N	\N	3b2712eebd4c9c8510df	50b5cfb3f0dd77c9190f
22	peterpipes@email.com	$2a$10$evnEuBsNy9INCp/uEaORo.UZPyh..SI1/LQhRKLtBkDAaUQkopaxe	9byyHbLN1Yg647AT7gy2	2017-08-24 05:37:43.247187	2017-08-24 05:37:43.247187	\N	\N	\N	606d576f167982d6aefc	612181ae64ac3e0953f9
13	tony@email.com	$2a$10$7vVCpCkmWs3mrBTDGnGAjuOtJBYIbLAwyuAVlM5JGS6eHej71lDEO	QAFvU91o1R3dvjRP8aki	2017-07-19 02:20:50.657587	2017-07-19 14:15:15.107006	\N	\N	\N	03119263c4101b25aba7	a3d9ce88dd2e0c09af5f
14	theocat@email.com	$2a$10$tQblqAa1Owarg4fJwepy/elepzC7RsXFb1SfyU4e0CfUGIGao0OVq	kttJsPwngTSCnqyRGuoX	2017-07-21 02:45:05.178831	2017-07-21 02:45:05.178831	\N	\N	\N	d2c5ff0fdd8e084dd026	a22277e6ea08d8f35a53
15	rita@emial.com	$2a$10$qITVDO9oVqNS8uX..fetD.yFpAT4bqXpyCh5fIqO.LEYnVVwVHdJ.	ckwEXsQQpPJcjZAPpyDR	2017-07-26 00:34:22.137324	2017-07-26 00:34:22.137324	\N	\N	\N	0096d2e5c05adea6f17b	d304bc2f080fe702cef4
16	west@email.com	$2a$10$7k0yy30xndwsdlTtPHqZ/OPoAiH/zgb29KqHE6yuV.pbhmsIcaWGq	adp7FZjxxhwmSjjx3d9p	2017-07-26 06:05:19.874723	2017-07-26 06:05:19.874723	\N	\N	\N	e56cb57f5912c7479669	88cd85444ce1e8c5fd73
18	romina@email.com	$2a$10$jmHknqY6lKam1gFqh0UsfuqTZmXf70wR/axRDuTFTfN.cJHucLtoa	8USyyNBnSR6kTKCzK6D7	2017-07-27 04:25:59.323304	2017-07-27 04:26:24.989975	\N	\N	\N	8d66e51cfbba3d0893c3	5c6c796ce2aceb9435c4
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Ron
--

SELECT pg_catalog.setval('users_id_seq', 22, true);


--
-- Name: access_contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY access_contacts
    ADD CONSTRAINT access_contacts_pkey PRIMARY KEY (id);


--
-- Name: action_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY action_statuses
    ADD CONSTRAINT action_statuses_pkey PRIMARY KEY (id);


--
-- Name: agencies_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY agencies
    ADD CONSTRAINT agencies_pkey PRIMARY KEY (id);


--
-- Name: agency_admins_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY agency_admins
    ADD CONSTRAINT agency_admins_pkey PRIMARY KEY (id);


--
-- Name: agency_tradie_companies_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY agency_tradie_companies
    ADD CONSTRAINT agency_tradie_companies_pkey PRIMARY KEY (id);


--
-- Name: agency_tradies_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY agency_tradies
    ADD CONSTRAINT agency_tradies_pkey PRIMARY KEY (id);


--
-- Name: agents_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY agents
    ADD CONSTRAINT agents_pkey PRIMARY KEY (id);


--
-- Name: ahoy_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY ahoy_messages
    ADD CONSTRAINT ahoy_messages_pkey PRIMARY KEY (id);


--
-- Name: appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);


--
-- Name: ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: availabilities_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY availabilities
    ADD CONSTRAINT availabilities_pkey PRIMARY KEY (id);


--
-- Name: comments_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (id);


--
-- Name: current_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY current_roles
    ADD CONSTRAINT current_roles_pkey PRIMARY KEY (id);


--
-- Name: gods_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY gods
    ADD CONSTRAINT gods_pkey PRIMARY KEY (id);


--
-- Name: guests_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY guests
    ADD CONSTRAINT guests_pkey PRIMARY KEY (id);


--
-- Name: images_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- Name: instructions_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY instructions
    ADD CONSTRAINT instructions_pkey PRIMARY KEY (id);


--
-- Name: invoice_items_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY invoice_items
    ADD CONSTRAINT invoice_items_pkey PRIMARY KEY (id);


--
-- Name: invoice_payments_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY invoice_payments
    ADD CONSTRAINT invoice_payments_pkey PRIMARY KEY (id);


--
-- Name: invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);


--
-- Name: landlords_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY landlords
    ADD CONSTRAINT landlords_pkey PRIMARY KEY (id);


--
-- Name: ledgers_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY ledgers
    ADD CONSTRAINT ledgers_pkey PRIMARY KEY (id);


--
-- Name: logs_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY logs
    ADD CONSTRAINT logs_pkey PRIMARY KEY (id);


--
-- Name: main_users_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY main_users
    ADD CONSTRAINT main_users_pkey PRIMARY KEY (id);


--
-- Name: maintenance_request_images_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY maintenance_request_images
    ADD CONSTRAINT maintenance_request_images_pkey PRIMARY KEY (id);


--
-- Name: maintenance_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY maintenance_requests
    ADD CONSTRAINT maintenance_requests_pkey PRIMARY KEY (id);


--
-- Name: messages_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: properties_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (id);


--
-- Name: queries_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY queries
    ADD CONSTRAINT queries_pkey PRIMARY KEY (id);


--
-- Name: quote_items_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY quote_items
    ADD CONSTRAINT quote_items_pkey PRIMARY KEY (id);


--
-- Name: quote_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY quote_requests
    ADD CONSTRAINT quote_requests_pkey PRIMARY KEY (id);


--
-- Name: quotes_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY quotes
    ADD CONSTRAINT quotes_pkey PRIMARY KEY (id);


--
-- Name: roles_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: service_needs_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY service_needs
    ADD CONSTRAINT service_needs_pkey PRIMARY KEY (id);


--
-- Name: services_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: skills_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);


--
-- Name: super_ledgers_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY super_ledgers
    ADD CONSTRAINT super_ledgers_pkey PRIMARY KEY (id);


--
-- Name: tenant_maintenance_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY tenant_maintenance_requests
    ADD CONSTRAINT tenant_maintenance_requests_pkey PRIMARY KEY (id);


--
-- Name: tenants_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY tenants
    ADD CONSTRAINT tenants_pkey PRIMARY KEY (id);


--
-- Name: tradies_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY tradies
    ADD CONSTRAINT tradies_pkey PRIMARY KEY (id);


--
-- Name: trady_companies_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY trady_companies
    ADD CONSTRAINT trady_companies_pkey PRIMARY KEY (id);


--
-- Name: trady_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY trady_statuses
    ADD CONSTRAINT trady_statuses_pkey PRIMARY KEY (id);


--
-- Name: uploaded_invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY uploaded_invoices
    ADD CONSTRAINT uploaded_invoices_pkey PRIMARY KEY (id);


--
-- Name: uploaded_quotes_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY uploaded_quotes
    ADD CONSTRAINT uploaded_quotes_pkey PRIMARY KEY (id);


--
-- Name: urls_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: user_conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY user_conversations
    ADD CONSTRAINT user_conversations_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: Ron
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: index_ahoy_messages_on_token; Type: INDEX; Schema: public; Owner: Ron
--

CREATE INDEX index_ahoy_messages_on_token ON ahoy_messages USING btree (token);


--
-- Name: index_ahoy_messages_on_user_id_and_user_type; Type: INDEX; Schema: public; Owner: Ron
--

CREATE INDEX index_ahoy_messages_on_user_id_and_user_type ON ahoy_messages USING btree (user_id, user_type);


--
-- Name: index_users_on_email; Type: INDEX; Schema: public; Owner: Ron
--

CREATE UNIQUE INDEX index_users_on_email ON users USING btree (email);


--
-- Name: index_users_on_reset_password_token; Type: INDEX; Schema: public; Owner: Ron
--

CREATE INDEX index_users_on_reset_password_token ON users USING btree (reset_password_token);


--
-- Name: public; Type: ACL; Schema: -; Owner: ron
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM ron;
GRANT ALL ON SCHEMA public TO ron;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

